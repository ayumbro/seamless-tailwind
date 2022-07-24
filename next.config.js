/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/stcss.less',
        destination: '/api/stcss',
      }
    ]
  },
}

module.exports = nextConfig
