import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'onlyoffice-docs',
  title: 'ONLYOFFICE Docs',
  license: 'AGPL-3.0-only',
  packageRepo: 'https://github.com/Start9Labs/onlyoffice-docs-startos',
  upstreamRepo: 'https://github.com/ONLYOFFICE/DocumentServer',
  marketingUrl: 'https://www.onlyoffice.com',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'data', 'db', 'startos'],
  images: {
    documentserver: {
      source: { dockerTag: 'onlyoffice/documentserver:9.4.0.1' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
