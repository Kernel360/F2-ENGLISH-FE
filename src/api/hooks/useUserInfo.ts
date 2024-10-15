import {
  UserResponse,
  UserUpdateResponse,
  UserUpdateRequest,
  UserTimeResponse,
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
