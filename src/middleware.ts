// import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {
  // 서버컴포넌트에서는 쿠키 접속 가능한지 확인 -> 가능!
  //   const test = cookies();
  //   console.log('============================test', test);
  return NextResponse.redirect(new URL('/login', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/mypage/:path*', '/scrapbook/:path*'],
};
