import { sdk } from './sdk'
import { dsHostId, dsPort } from './utils'

// Bound but never exported: the editor reaches browsers through Nextcloud's own
// origin, which ONLYOFFICE derives per request from the forwarded headers.
export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  await sdk.MultiHost.of(effects, dsHostId).bindPort(dsPort, {
    protocol: 'http',
  })
  return []
})
