const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // 扩展webpack的alias配置
    config.resolve.alias['pg-connection-string'] = path.join(__dirname, 'node_modules', 'pg-connection-string');

    return config;
  },
};

module.exports = nextConfig;