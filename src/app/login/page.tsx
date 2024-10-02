'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      console.log('login');
      router.push(`http://localhost:8080/oauth2/authorization/naver`);
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
