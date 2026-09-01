# Updating ONLYOFFICE Docs

## Where the version comes from

ONLYOFFICE publishes the Community edition to Docker Hub as [`onlyoffice/documentserver`](https://hub.docker.com/r/onlyoffice/documentserver). Tags are four-part — `<major>.<minor>.<patch>.<build>` — alongside shorter `<major>.<minor>` and `<major>.<minor>.<patch>` aliases that move. Pin the four-part tag.

Releases come every few months, and the whole tag set is often re-pushed on the same day for a base-image rebuild, so sort by name rather than trusting `last_updated` to tell you which is newest:

```bash
curl -s "https://hub.docker.com/v2/repositories/onlyoffice/documentserver/tags?page_size=100" \
  | jq -r '.results[].name | select(test("^[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+$"))' \
  | sort -V | tail -5
```

Confirm the tag ships both architectures before pinning it:

```bash
docker manifest inspect onlyoffice/documentserver:<tag> | jq -r '.manifests[].platform.architecture'
```

Upstream's own release notes are on the [DocumentServer releases page](https://github.com/ONLYOFFICE/DocumentServer/releases).

## Making the bump

1. Set the new tag on `images.documentserver.source.dockerTag` in `startos/manifest/index.ts`.
2. Set `version` in `startos/versions/current.ts`, tracking upstream's first three parts as `<major>.<minor>.<patch>:<revision>`. A packaging-only change bumps the revision after the colon.
3. Write release notes describing what the user will notice. Upstream's notes cover the editors themselves.

## What to watch for

The environment variables this package sets are read once, at container start, by `run-document-server.sh`. `ALLOW_PRIVATE_IP_ADDRESS` is the load-bearing one: without it ONLYOFFICE refuses to fetch documents from Nextcloud's bridge address, and every document fails to open with a download error rather than anything that names the cause.

`JWT_HEADER` must stay `AuthorizationJwt` and must match what Nextcloud's connector is configured with. The plain `Authorization` header collides with Nextcloud's own.

The virtual-path support this package relies on is nginx's `map $http_x_forwarded_prefix $the_prefix` in `includes/http-common.conf`, plus the matching `X-Forwarded-Host` and `X-Forwarded-Proto` maps. If a release drops or renames those, the editor will load from the wrong origin — check that file in the new image before assuming anything else.

Also confirm `DB_TYPE` and friends are still Enterprise-only. If the Community edition ever gains external-database support, this package should stop carrying a bundled PostgreSQL on a volume of its own.
