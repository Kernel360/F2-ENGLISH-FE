'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { useRequestLogout } from '@/api/hooks/useUserInfo'; // custom hook import
import { usePathname } from 'next/navigation';

interface LogInOutButtonProps {
  textColor?: string;
  bgColor?: string;
}

export default function LogInOutButton({
  textColor,
  bgColor,
}: LogInOutButtonProps) {
  const { data: isLogin } = useUserLoginStatus();
  const { mutate: fetchUserLogout } = useRequestLogout();
  const currentPathname = usePathname();

  return isLogin?.data ? (
    <Button onClick={() => fetchUserLogout()}>로그아웃</Button>
  ) : (
    <Link href={`/login?returnUrl=${currentPathname}`}>
      <Button className={`${bgColor || ''} ${textColor || ''}`}>로그인</Button>
    </Link>
  );
}
