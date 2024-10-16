'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUserLoginStatus } from '@/api/hooks/useUserInfo'; // custom hook import
import { useRequestLogout } from '@/api/hooks/useUserInfo'; // custom hook import
import { usePathname } from 'next/navigation';

export default function LogInOutButton() {
  const { data: isLogin } = useUserLoginStatus();
  const { mutate: fetchUserLogout } = useRequestLogout();
  const currentPathname = usePathname();

  return isLogin?.data ? (
    <Button onClick={() => fetchUserLogout()}>로그아웃</Button>
  ) : (
    <Link href={`/login?returnUrl=${currentPathname}`}>
      <Button>로그인</Button>
    </Link>
  );
}
