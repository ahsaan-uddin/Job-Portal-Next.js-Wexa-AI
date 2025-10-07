/** @type {import('next').NextConfig} */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nextConfig = {
  // CRITICAL: Add this for Docker optimization
  output: 'standalone',
  
  // Your existing config
  images: {
    domains: ['api.dicebear.com', 'xsgames.co'],
  },
  reactStrictMode: true,
  
  // Webpack configuration (fixed)
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add PDF worker plugin only for client side
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.min.js'),
              to: path.join(__dirname, '.next/static/chunks/[name][ext]'),
            },
          ],
        })
      );
    }

    // PDF.js worker config
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist': path.join(__dirname, 'node_modules/pdfjs-dist'),
    };

    return config;
  },
  
  // Experimental features (optional but recommended)
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig