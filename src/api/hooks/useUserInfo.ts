import { UserResponse, UserUpdateResponse } from '@/types/User';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUserInfo, updateUserInfo } from '@/api/queries/userQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserUpdateRequest } from '@/types/User';

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
