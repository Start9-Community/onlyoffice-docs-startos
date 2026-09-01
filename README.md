<p align="center">
  <img src="icon.png" alt="ONLYOFFICE Docs Logo" width="21%">
</p>

# ONLYOFFICE Docs on StartOS

> Everything not listed in this document should behave the same as upstream
> ONLYOFFICE Docs. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[ONLYOFFICE Docs](https://github.com/ONLYOFFICE/DocumentServer) is an online office suite whose native formats are OOXML, giving it the closest match to Microsoft Office rendering of any open-source suite. It edits documents for a host application that stores the files; on StartOS that host is Nextcloud, through the ONLYOFFICE app.

This package runs the Community edition image and wires it to Nextcloud entirely over the internal container bridge. It exports no address of its own — Nextcloud serves the editor from whichever of its own origins the browser is already using.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The package wraps the upstream `onlyoffice/documentserver` image unmodified and runs its default entrypoint.

| | |
| --- | --- |
| Image source | Upstream `onlyoffice/documentserver` (Community edition), unmodified |
| Architectures | x86_64, aarch64 |
| Entrypoint | Default (`/app/ds/run-document-server.sh`), `runAsInit: true` |
| Subcontainers | `documentserver` — the only container, but it runs many processes |

That single container is a whole stack under `supervisord`: nginx, PostgreSQL, RabbitMQ, Redis, and the Node document and conversion services. `runAsInit: true` is required — `supervisord` aborts unless it is PID 1. The Community edition cannot be pointed at an external database: the `DB_*` environment variables exist only in the Enterprise and Developer editions, so the bundled engines are not a packaging choice.

Configuration is entirely by environment variable, read once at container start.

## Volume and Data Layout

Three volumes hold container state and a fourth holds this package's own. Documents themselves live in Nextcloud; what is here is the working state of editing sessions.

| Volume | Mount point | Contents |
| --- | --- | --- |
| `main` | `/var/lib/onlyoffice` | Editing cache and the forgotten-files store |
| `data` | `/var/www/onlyoffice/Data` | The upstream data store |
| `db` | `/var/lib/postgresql` | The bundled PostgreSQL |
| `startos` | not mounted | `store.json` and the shared JWT secret |

`/var/log/onlyoffice` is deliberately not mounted — the service log is where those lines belong. The fonts directory the image declares is not mounted either, since nothing in the package adds fonts to it.

## File Models

The package owns two files, both on the unmounted `startos` volume, and both holding StartOS-side state rather than upstream configuration. ONLYOFFICE has no configuration file this package writes — every setting reaches it as an environment variable.

| Model | File | How it is seeded | What rewrites it |
| --- | --- | --- | --- |
| `storeJson` | `store.json` | Generated once, on install | Nothing |
| `jwtSecretFile` | `shared/jwt-secret` | Written alongside it, on install | Nothing |

Both hold the same value: the JWT secret that authenticates every request between Nextcloud and this service. It is generated once at install and never rotated or re-asserted. The second copy exists as a bare file so Nextcloud can mount that one subpath read-only and read nothing else — `store.json` sits beside it and stays out of view.

Because the secret is delivered as an environment variable, it is read only at container start; nothing re-reads it while running.

## Dependencies

None. ONLYOFFICE Docs is declared with no dependencies, and Nextcloud declares the dependency in the other direction — a package cannot be both the dependency and the dependent of the same service.

## Network Access and Interfaces

The package exports no interfaces. Port 80 is bound so other containers can reach it across the internal bridge, but nothing is exported onto the LAN, a Tor address, or a domain.

| Binding | Port | Exported | Purpose |
| --- | --- | --- | --- |
| `main` | 80 | No — bridge only | The editor, its assets, and the conversion API |

Everything a browser loads arrives through Nextcloud, which proxies a single path prefix to this port and sets `X-Forwarded-Host`, `X-Forwarded-Proto` and `X-Forwarded-Prefix`. ONLYOFFICE builds its own public URLs from those headers per request, so the editor works on every address Nextcloud is reachable at, simultaneously, with nothing configured.

## Installation and First-Run Flow

ONLYOFFICE fetches and saves documents over the host bridge, so Nextcloud has to trust that host — the Nextcloud package adds it to `trusted_domains` while a suite is selected. Without it `occ onlyoffice:documentserver --check` reports a download error.

There is nothing to configure. The JWT secret is generated on install, and the service starts and runs without any user input.

First start is slow — the container initializes PostgreSQL, RabbitMQ and Redis and generates its font list before it serves anything. Several minutes is normal, and the health check stays red throughout.

The ONLYOFFICE app for Nextcloud is not installed by this package. The user installs it from Nextcloud's own app store, and Nextcloud's Office Suite action wires the two together.

## Actions

None. Everything this package needs is generated at install and derived at runtime, and the Community edition has no admin panel to hold credentials for.

## Tasks

None. The service is never held on a prompt, and its ordinary controls are always available.

## Health Checks

One check, on the daemon itself.

**Editor** (daemon `documentserver`) — fetches `/healthcheck` over the container bridge, which returns `true` only once the document service is up behind nginx.

It carries a ten-minute grace period, so the long first start reads as *starting* rather than failed; see the first-run note above. A failure that survives it is usually memory — this service wants several gigabytes, and a server that cannot give it that will have processes killed as they start, which shows up here as a check that never goes green. The service log names which supervised process died.

## Backups and Restore

The `main`, `data` and `startos` volumes are copied wholesale (`ofVolumes`). Nothing is dumped.

`db` is deliberately excluded. It is the bundled PostgreSQL, and a file copy of a running Postgres is a torn one that can refuse to start; what it holds is the set of editing sessions in flight at backup time, which is worthless by the time anyone restores. It is rebuilt empty on first start.

A restored instance keeps its JWT secret, so it stays paired with a Nextcloud restored alongside it and needs nothing re-entered. Restoring only one of the two breaks the pairing — the secrets no longer match, and Nextcloud reports the editors as unavailable until both sides agree again.

## Limitations and Differences

1. **Heavy, and worth it only in a narrow case.** Upstream recommends 4 GB of memory and 2 GB of swap for this service alone, on top of Nextcloud and everything else on the server. Both suites edit OOXML without losing content — measured on a complex Word document, each preserved the text byte-for-byte along with every table, cell, image, hyperlink, bookmark, footnote, endnote and field. The difference is that this one returns the file structurally identical, where LibreOffice resolves style-inherited formatting into direct formatting on each run. That is invisible on screen and matters only when a large corpus of style-dependent documents keeps round-tripping to Microsoft Office; for anything else Collabora Online is the right package.
2. **No address of its own.** ONLYOFFICE is not reachable except through Nextcloud, and there is no way to reach the editor while Nextcloud is stopped.
3. **No admin panel.** The Community edition ships none — it is an Enterprise feature — so there is no administrative interface to expose, and no credentials for one.
4. **The bundled database is not backed up.** In-flight editing sessions do not survive a restore.
5. **Community edition.** ONLYOFFICE's Enterprise builds, their mobile web editors, white-labelling, and the support contract are not what this package ships. The 20-connection limit that used to define the Community edition was removed upstream and does not apply.

---

## Quick Reference for AI Consumers

```yaml
package_id: onlyoffice-docs
image: onlyoffice/documentserver
architectures: [x86_64, aarch64]
subcontainers: [documentserver]
volumes:
  main: /var/lib/onlyoffice
  data: /var/www/onlyoffice/Data
  db: /var/lib/postgresql
  startos: not mounted
file_models:
  - store.json
  - shared/jwt-secret
startos_managed_env_vars:
  - JWT_ENABLED
  - JWT_SECRET
  - JWT_HEADER
  - ALLOW_PRIVATE_IP_ADDRESS
  - METRICS_ENABLED
dependencies: none
interfaces: {}
actions: []
tasks: []
health_checks:
  - documentserver # the daemon id, which is what the check is named
```
