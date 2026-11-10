import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '10.0.0:1',
  releaseNotes: {
    en_US: 'StartOS package improvements; no change to ONLYOFFICE Docs.',
    es_ES: 'Mejoras del paquete de StartOS; sin cambios en ONLYOFFICE Docs.',
    de_DE:
      'Verbesserungen am StartOS-Paket; keine Änderung an ONLYOFFICE Docs.',
    pl_PL: 'Ulepszenia pakietu StartOS; bez zmian w ONLYOFFICE Docs.',
    fr_FR:
      'Améliorations du paquet StartOS ; aucun changement pour ONLYOFFICE Docs.',
  },
  migrations: {
    up: async () => {
      await rm(sdk.volumes.startos.subpath('shared'), {
        recursive: true,
        force: true,
      })
    },
    down: IMPOSSIBLE,
  },
})
