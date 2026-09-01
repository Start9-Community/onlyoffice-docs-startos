import { utils } from '@start9labs/start-sdk'

export const dsPort = 80
export const dsHostId = 'main'

// Nextcloud is the only host this package is built to serve. Read rather than
// depended on: Nextcloud declares the dependency in the other direction, and
// declaring it here too would close a cycle.
export const nextcloudId = 'nextcloud'
export const nextcloudHostId = 'main'
export const nextcloudPort = 80

// The header ONLYOFFICE expects the JWT in. Nextcloud's connector must be set
// to the same value; `Authorization` collides with Nextcloud's own auth.
export const JWT_HEADER = 'AuthorizationJwt'

// Where a dependent mounts to read the shared JWT secret. Its own subdirectory
// so `store.json`, which sits beside it on the same volume, stays out of view.
export const SHARED_SUBPATH = './shared/jwt-secret'

export const getSecret = () =>
  utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 48 })
