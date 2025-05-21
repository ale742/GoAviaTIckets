const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dav.kz',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jetphotos.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.planespotters.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.airport-data.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'airport-data.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;