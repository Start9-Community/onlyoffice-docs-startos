# ONLYOFFICE Docs

ONLYOFFICE Docs has no address of its own and no interface to open. Nextcloud serves the editor, so everything below happens on your Nextcloud. It is also a demanding service — if your server is short of memory, Collabora Online does the same job in about a quarter of the space.

## Documentation

- [ONLYOFFICE app for Nextcloud](https://github.com/ONLYOFFICE/onlyoffice-nextcloud/blob/master/README.md) — the connector's settings, supported formats, and how editing works.

## What you get on StartOS

Documents, spreadsheets and presentations you can open and edit in the browser, straight from Nextcloud Files, with several people editing the same file at once. ONLYOFFICE reads and writes Word, Excel and PowerPoint formats natively, so files made in Microsoft Office keep their formatting more faithfully than in most alternatives. It also edits PDFs and fills in PDF forms.

Your files stay in Nextcloud; ONLYOFFICE only holds them while a document is open. The editor is served from your Nextcloud's own address, so it works wherever Nextcloud works — local network, public domain, or Tor — all at once, with nothing to switch between them.

## Getting set up

Install Nextcloud first — ONLYOFFICE does nothing without it.

1. In Nextcloud's web interface, open **Apps** and install **ONLYOFFICE**. Leave it enabled.
2. Run Nextcloud's **Office Suite** action in StartOS and choose ONLYOFFICE Docs.

That is all — there is nothing to set here. Open any document in Nextcloud Files to check it works.

The first start takes several minutes while the service sets up its database and font list, and it will show as not ready until it finishes. That is normal, and only happens once.

## Using ONLYOFFICE Docs

You never open ONLYOFFICE directly. In Nextcloud, click a document, spreadsheet, presentation or PDF and it opens in the editor. Create new ones from the **+** menu in Files.

## Limitations

This service wants around 4 GB of memory to itself, on top of Nextcloud. On a server that cannot spare it you will see the service fail to come up rather than run slowly, and Collabora Online is the better choice.
