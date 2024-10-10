/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.cnn.com', 'images.unsplash.com', 'avatar.iran.liara.run'], // 외부 이미지 도메인 추가
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
