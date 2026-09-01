import { sdk } from './sdk'

// `db` is excluded: it holds only the editing sessions currently in flight, and
// a file copy of a running Postgres is a torn one that can refuse to start.
export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('main', 'data', 'startos'),
)
