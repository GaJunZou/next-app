const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd-mobile'],
  webpack: (config) => {
    // 扩展webpack的alias配置
    config.resolve.alias['pg-connection-string'] = path.join(__dirname, 'node_modules', 'pg-connection-string');

    return config;
  },
  output: 'export',
  unoptimized: true
};

module.exports = nextConfig;