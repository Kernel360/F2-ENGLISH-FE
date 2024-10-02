'use client';

import { useState, useEffect } from 'react';

export default function TestPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 백엔드 API 서버로 GET 요청
        // API 경로만 변경해서 요청해주시면 돼요!
        const response = await fetch('https://biengual.store/api/u1/user/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 쿠키를 포함한 요청이 필요하면 설정
        });

        // 응답이 성공적이지 않은 경우 에러 처리
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 응답 데이터를 JSON 형태로 변환
        const result = await response.json();
        console.log(result);
        setData(result); // 상태에 저장하여 화면에 표시
        // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
        console.error('Fetch error: ', error);
      }
    };

    fetchData(); // API 호출
  }, []);

  return (
    <div>
      <h1>API 통신 테스트</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
      )}
    </div>
  );
}
