import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'onlyoffice-docs',
  title: 'ONLYOFFICE Docs',
  license: 'AGPL-3.0-only',
  packageRepo: 'https://github.com/Start9-Community/onlyoffice-docs-startos',
  upstreamRepo: 'https://github.com/ONLYOFFICE/DocumentServer',
  marketingUrl: 'https://www.onlyoffice.com',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'data', 'startos'],
  images: {
    documentserver: {
      source: {
        dockerBuild: {
          buildArgs: { IMAGE: 'onlyoffice/documentserver:10.0.0.1' },
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
