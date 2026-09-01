import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '9.4.0:0',
  releaseNotes: {
    en_US:
      'ONLYOFFICE Docs for StartOS. Install it alongside Nextcloud, install the ONLYOFFICE app from the Nextcloud app store, and pick your office suite in Nextcloud’s Office Suite action.',
    es_ES:
      'ONLYOFFICE Docs para StartOS. Instálelo junto a Nextcloud, instale la aplicación ONLYOFFICE desde la tienda de aplicaciones de Nextcloud y elija su suite ofimática en la acción Suite ofimática de Nextcloud.',
    de_DE:
      'ONLYOFFICE Docs für StartOS. Installieren Sie es zusammen mit Nextcloud, installieren Sie die ONLYOFFICE-App aus dem Nextcloud App Store und wählen Sie Ihre Office-Suite in der Aktion „Office-Suite“ von Nextcloud.',
    pl_PL:
      'ONLYOFFICE Docs dla StartOS. Zainstaluj go obok Nextcloud, zainstaluj aplikację ONLYOFFICE ze sklepu z aplikacjami Nextcloud i wybierz pakiet biurowy w akcji Pakiet biurowy w Nextcloud.',
    fr_FR:
      "ONLYOFFICE Docs pour StartOS. Installez-le aux côtés de Nextcloud, installez l'application ONLYOFFICE depuis la boutique d'applications Nextcloud, puis choisissez votre suite bureautique dans l'action Suite bureautique de Nextcloud.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
