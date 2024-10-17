import { UserLoginStatusResponse } from '@/types/User';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUserLoginStatus } from '../queries/userQueries';

// 로그인 상태 확인하는 tanstack query훅.
const useUserLoginStatus = (): UseQueryResult<UserLoginStatusResponse> => {
  return useQuery<UserLoginStatusResponse>({
    queryKey: ['loginStatus'],
    queryFn: fetchUserLoginStatus,
  });
};

export default useUserLoginStatus;
