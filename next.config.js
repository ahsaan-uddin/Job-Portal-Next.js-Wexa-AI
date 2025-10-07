/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['api.dicebear.com', 'xsgames.co'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig