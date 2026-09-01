import { jwtSecretFile, storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { getSecret } from '../utils'

export const generateSecret = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  const jwtSecret = getSecret()
  await storeJson.merge(effects, { jwtSecret })
  await jwtSecretFile.write(effects, jwtSecret)
})
