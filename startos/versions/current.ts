import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '9.4.0:0',
  releaseNotes: {
    en_US:
      'ONLYOFFICE Docs for StartOS. Install it alongside Nextcloud, then pick it in Nextcloud’s Office Suite action — Nextcloud installs the app it needs and points itself at this service.',
    es_ES:
      'ONLYOFFICE Docs para StartOS. Instálelo junto a Nextcloud y elíjalo después en la acción Suite ofimática de Nextcloud: Nextcloud instala la aplicación que necesita y se apunta a este servicio.',
    de_DE:
      'ONLYOFFICE Docs für StartOS. Installieren Sie es zusammen mit Nextcloud und wählen Sie es dann in Nextclouds Aktion „Office-Suite“ — Nextcloud installiert die benötigte App und richtet sich selbst auf diesen Dienst aus.',
    pl_PL:
      'ONLYOFFICE Docs dla StartOS. Zainstaluj go obok Nextcloud, a następnie wskaż w akcji Pakiet biurowy w Nextcloud — Nextcloud zainstaluje potrzebną aplikację i sam skieruje się na tę usługę.',
    fr_FR:
      'ONLYOFFICE Docs pour StartOS. Installez-le aux côtés de Nextcloud, puis choisissez-le dans l’action Suite bureautique de Nextcloud : Nextcloud installe l’application nécessaire et se pointe sur ce service.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
