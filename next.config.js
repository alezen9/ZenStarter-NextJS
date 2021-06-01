const withPWA = require('next-pwa')

const RESET_COLOR = '\x1b[0m'
const GREEN_TEXT = '\x1b[32m'

const enablePWA = process.env.NEXT_PUBLIC_ENABLE_PWA === 'true'

const getApiUrl = (config = '') => {
  console.log(`${GREEN_TEXT}[QUAESTIONES] ${config} config env: ${process.env.ENV}${RESET_COLOR}`)
  console.log(`${GREEN_TEXT}[QUAESTIONES] Listening on port ${process.env.PORT || 3000}${RESET_COLOR}`)
  switch (process.env.ENV || 'staging') {
    case 'staging':
      return 'https://quaestiones.demos.classicinformatics.com/api'
    case 'production':
      return 'https://api.quaestiones.com/api'
    default:
      return 'https://quaestiones.demos.classicinformatics.com/api'
  }
}

module.exports = withPWA({
  future: {
    webpack5: true
  },
  serverRuntimeConfig: {
    API_URL: getApiUrl('server')
  },
  publicRuntimeConfig: {
    API_URL: getApiUrl('public'),
    NODE_ENV: process.env.NODE_ENV,
    ENV: process.env.ENV
  },
  devIndicators: {
    autoPrerender: false
  },
  pwa: {
    disable: !enablePWA,
    register: enablePWA,
    scope: '/',
    dest: 'public',
    maximumFileSizeToCacheInBytes: 10000000, // 10MB
    sourcemap: false,
    dynamicStartUrlRedirect: '/'
  }
})
