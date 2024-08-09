/** @type {import('next').NextConfig} */
//  /!\ Be carefull, this env var are exposed client side !
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true'
})

const nextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    API_URL: process.env.API_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    SUPERTOKENS_API_BASE_PATH: process.env.SUPERTOKENS_API_BASE_PATH,
    SUPERTOKENS_FRONTEND_BASE_PATH: process.env.SUPERTOKENS_FRONTEND_BASE_PATH,
    REGEX_VALIDATE_USERNAME: '^[a-zA-Z0-9-_.]{3,24}$'
  }
}

module.exports = withBundleAnalyzer(nextConfig)
