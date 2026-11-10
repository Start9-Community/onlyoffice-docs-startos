import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  jwtSecret: z.string().optional().catch(undefined),
})

export type Store = z.infer<typeof shape>

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: './store.json' },
  shape,
)

// A copy of `jwtSecret` on the `public` volume, which Nextcloud mounts read-only.
export const jwtSecretFile = FileHelper.string({
  base: sdk.volumes.public,
  subpath: './jwt-secret',
})
