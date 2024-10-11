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
      { protocol: 'https', hostname: 'i.ytimg.com' }, // api로 받아오는 데이터 img주소 무조건 추가해줘야함
      { protocol: 'https', hostname: 'yozm.wishket.com' }, // api로 받아오는 데이터 img주소 무조건 추가해줘야함
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
