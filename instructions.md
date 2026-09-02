# ONLYOFFICE Docs

ONLYOFFICE Docs has no address of its own and no interface to open. Nextcloud serves the editor, so everything below happens on your Nextcloud.

Most people should install Collabora Online instead. This one earns its size in a narrow case: a large body of complex documents that keeps moving between your server and Microsoft Office. See **Is this the one you want?** below before going further.

## Documentation

- [ONLYOFFICE app for Nextcloud](https://github.com/ONLYOFFICE/onlyoffice-nextcloud/blob/master/README.md) — the connector's settings, supported formats, and how editing works.

## What you get on StartOS

Documents, spreadsheets and presentations you can open and edit in the browser, straight from Nextcloud Files, with several people editing the same file at once. ONLYOFFICE reads and writes Word, Excel and PowerPoint formats natively, so files made in Microsoft Office keep their formatting more faithfully than in most alternatives. It also edits PDFs and fills in PDF forms.

Your files stay in Nextcloud; ONLYOFFICE only holds them while a document is open. The editor is served from your Nextcloud's own address, so it works wherever Nextcloud works — local network, public domain, or Tor — all at once, with nothing to switch between them.

## Getting set up

Install Nextcloud first — ONLYOFFICE does nothing without it.

Run Nextcloud's **Office Suite** action in StartOS and choose ONLYOFFICE Docs. That is the whole setup — Nextcloud installs the **ONLYOFFICE** app it needs and points itself at this service, and there is nothing to set here.

Open any document in Nextcloud Files to check it works.

The first start takes several minutes while the service sets up its database and font list, and it will show as not ready until it finishes. That is normal, and only happens once.

## Using ONLYOFFICE Docs

You never open ONLYOFFICE directly. In Nextcloud, click a document, spreadsheet, presentation or PDF and it opens in the editor. Create new ones from the **+** menu in Files.

## Is this the one you want?

Both this and Collabora Online edit Word, Excel and PowerPoint files, and neither loses anything: text, tables, images, links, footnotes and page layout all survive either one, and a document looks the same on screen in both.

They differ in what they write back to the file. This one stores documents in the same format Word and Excel use, so a file comes back exactly as it went in. Collabora is built on LibreOffice: it reads the file into its own model and writes it out again, spelling out on each paragraph the formatting the document had left to its styles. You will not see that on screen. You will see it if someone later opens the file in Word and changes a style, because the parts that were spelled out no longer follow it.

For a handful of documents that costs you nothing — you would never notice, and you could repair one by hand. It adds up when there are hundreds, when the styles are doing real work (a house template, a legal or academic format), and when the files keep going back to Word. That is the case this service is for.

If that is not your situation, install Collabora Online: it does the same job in about a quarter of the memory and opens more kinds of file besides.

## Limitations

This service wants around 4 GB of memory to itself, on top of Nextcloud. On a server that cannot spare it you will see the service fail to come up rather than run slowly.
