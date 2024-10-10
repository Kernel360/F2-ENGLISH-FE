/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.cnn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'https://biengual.store/api/:path*',
      },
      {
        source: '/oauth2/:path*',
        destination: 'https://biengual.store/oauth2/:path*',
        // http://13.238.253.88:8080/oauth2/authorization/naver
      },
    ];
  },
};

export default nextConfig;
