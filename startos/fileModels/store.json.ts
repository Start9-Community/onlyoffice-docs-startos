import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { SHARED_SUBPATH } from '../utils'

const shape = z.object({
  jwtSecret: z.string().optional().catch(undefined),
})

export type Store = z.infer<typeof shape>

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: './store.json' },
  shape,
)

// The same secret as `store.json`'s `jwtSecret`, alone in a file so Nextcloud
// can mount this subpath read-only and read nothing else.
export const jwtSecretFile = FileHelper.string({
  base: sdk.volumes.startos,
  subpath: SHARED_SUBPATH,
})
