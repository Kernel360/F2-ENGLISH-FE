'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUserLoginStatus } from '@/api/hooks/useUserInfo'; // custom hook import
import { useRequestLogout } from '@/api/hooks/useUserInfo'; // custom hook import

export default function LogInOutButton() {
  const { data: isLogin } = useUserLoginStatus();
  const { mutate: fetchUserLogout } = useRequestLogout();

  return isLogin?.data ? (
    <Button onClick={() => fetchUserLogout()}>로그아웃</Button>
  ) : (
    <Link href="/login">
      <Button>로그인</Button>
    </Link>
  );
}
