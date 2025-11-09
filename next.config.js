/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  reactStrictMode: true,
  // Disable static optimization to avoid build-time Supabase issues
  output: undefined,
}

module.exports = withPWA(nextConfig)
