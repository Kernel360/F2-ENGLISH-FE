'use client';

import { useRouter } from 'next/navigation';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default function Page() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      console.log('login');
      // TODO(@smosco): 개발서버 dev, 운영서버 api next.config에서 설정?
      router.push(`${BASE_URL}/oauth2/authorization/kakao`);
    } catch (error) {
      console.error('Naver login failed:', error);
    }
  };

  return (
    <div>
      <button type="submit" onClick={handleGoogleLogin}>
        Login
      </button>
    </div>
  );
}
