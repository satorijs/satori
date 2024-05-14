import { createRequire } from 'node:module'
import scaffold from 'create-cordis'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

scaffold({
  name: 'satori',
  version,
  template: '@satorijs/boilerplate',
})
