import {
  UserResponse,
  UserUpdateResponse,
  UserUpdateRequest,
  UserTimeResponse,
  UserLoginStatusResponse,
  UserRequestLogoutResponse,
} from '@/types/User';
import {
  useQuery,
  UseQueryResult,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import {
  fetchUserInfo,
  updateUserInfo,
  fetchUserTime,
  fetchUserLoginStatus,
  fetchUserLogout,
} from '@/api/queries/userQueries';

export const useUserInfo = (): UseQueryResult<UserResponse> => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserInfo(),
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<UserUpdateResponse, Error, UserUpdateRequest>({
    mutationFn: (userInfo: UserUpdateRequest) => updateUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useUserTime = (): UseQueryResult<UserTimeResponse> => {
  return useQuery({
    queryKey: ['userTime'],
    queryFn: () => fetchUserTime(),
  });
};

// 로그인 상태 확인하는 tanstack query훅.
export const useUserLoginStatus =
  (): UseQueryResult<UserLoginStatusResponse> => {
    return useQuery<UserLoginStatusResponse>({
      queryKey: ['loginStatus'],
      queryFn: fetchUserLoginStatus,
    });
  };

export const useRequestLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<UserRequestLogoutResponse, Error>({
    mutationFn: () => fetchUserLogout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loginStatus'] });
    },
  });
};
