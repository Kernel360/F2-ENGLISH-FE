/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.cnn.com', 'images.unsplash.com'], // 외부 이미지 도메인 추가
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://13.238.253.88:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
