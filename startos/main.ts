import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { dsHostId, dsPort, JWT_HEADER } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info('Starting ONLYOFFICE Docs')

  const jwtSecret = await storeJson.read((s) => s.jwtSecret).const(effects)

  const ownAddress = await sdk.host
    .getBridgeAddress(effects, {
      hostId: dsHostId,
      internalPort: dsPort,
      ssl: false,
    })
    .const()

  return sdk.Daemons.of(effects).addDaemon('documentserver', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'documentserver' },
      sdk.Mounts.of()
        .mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint: '/var/lib/onlyoffice',
          readonly: false,
        })
        .mountVolume({
          volumeId: 'data',
          subpath: null,
          mountpoint: '/var/www/onlyoffice/Data',
          readonly: false,
        })
        .mountVolume({
          volumeId: 'db',
          subpath: null,
          mountpoint: '/var/lib/postgresql',
          readonly: false,
        }),
      'documentserver',
    ),
    exec: {
      command: sdk.useEntrypoint(),
      // The image runs supervisord, which manages nginx, Postgres, RabbitMQ,
      // Redis and the document services, and aborts unless it is PID 1.
      runAsInit: true,
      env: {
        JWT_ENABLED: 'true',
        JWT_HEADER,
        ...(jwtSecret ? { JWT_SECRET: jwtSecret } : {}),
        // Nextcloud hands us its bridge address as the document source, and
        // ONLYOFFICE refuses to fetch from a private range without this.
        ALLOW_PRIVATE_IP_ADDRESS: 'true',
        METRICS_ENABLED: 'false',
      },
    },
    ready: {
      display: i18n('Editor'),
      fn: () =>
        ownAddress
          ? sdk.healthCheck.checkWebUrl(
              effects,
              `http://${ownAddress}/healthcheck`,
              {
                successMessage: i18n('Ready to edit documents'),
                errorMessage: i18n('Not ready to edit documents'),
              },
            )
          : Promise.resolve({
              result: 'starting' as const,
              message: i18n('Not ready to edit documents'),
            }),
      // First start initialises PostgreSQL, RabbitMQ and Redis and generates
      // the font list before nginx serves anything, which upstream and this
      // package both describe as taking minutes. Without this the check reports
      // a hard failure for that whole window.
      gracePeriod: 600_000,
    },
    requires: [],
  })
})
