/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/scene-assets/:path*',
        destination: `${process.env.BUCKET_URL}/:path*`,
      },
    ]
  },
};

module.exports = nextConfig
