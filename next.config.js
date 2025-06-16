/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'postgres-pool': 'commonjs postgres-pool',
      'net': 'commonjs net',
      'tls': 'commonjs tls',
      'fs': 'commonjs fs',
    });
    return config;
  },
}

module.exports = nextConfig 