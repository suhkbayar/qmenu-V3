/** @type {import('next').NextConfig} */
const nextConfig = {
  images:  {
    domains: ['images.qrms.mn','dev-images.qrms.mn'],
  },
  reactStrictMode: true,
  output: "standalone",
}

module.exports = nextConfig
