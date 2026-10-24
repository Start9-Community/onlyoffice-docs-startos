import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '10.0.0:0',
  releaseNotes: {
    en_US: 'Updated ONLYOFFICE Docs to 10.0.0.',
    es_ES: 'ONLYOFFICE Docs actualizado a 10.0.0.',
    de_DE: 'ONLYOFFICE Docs auf 10.0.0 aktualisiert.',
    pl_PL: 'Zaktualizowano ONLYOFFICE Docs do wersji 10.0.0.',
    fr_FR: 'ONLYOFFICE Docs mis à jour vers la version 10.0.0.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
