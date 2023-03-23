/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images:{
    domains:["res.cloudinary.com"]
  }
}

module.exports = nextConfig
