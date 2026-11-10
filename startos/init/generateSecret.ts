import { jwtSecretFile, storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { getSecret } from '../utils'

export const generateSecret = sdk.setupOnInit(async (effects) => {
  let jwtSecret = await storeJson.read((s) => s.jwtSecret).once()
  if (!jwtSecret) {
    jwtSecret = getSecret()
    await storeJson.merge(effects, { jwtSecret })
  }
  await jwtSecretFile.write(effects, jwtSecret)
})
