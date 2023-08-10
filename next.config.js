/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['static.vecteezy.com', "www.datocms-assets.com", "www.nasa.gov"],
  },
}

module.exports = nextConfig
