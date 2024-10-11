import {
  UserResponse,
  UserUpdateResponse,
  UserUpdateRequest,
} from '@/types/User';
import {
  useQuery,
  UseQueryResult,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import { fetchUserInfo, updateUserInfo } from '@/api/queries/userQueries';

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
