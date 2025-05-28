import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    API: process.env.API_URL,
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
  },
}

export default nextConfig
