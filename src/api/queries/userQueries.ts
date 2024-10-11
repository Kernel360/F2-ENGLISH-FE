import {
  UserResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from '@/types/User';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const fetchUserInfo = async (): Promise<UserResponse> => {
  const response = await fetch(`${BASE_URL}/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateUserInfo = async (
  userInfo: UserUpdateRequest,
): Promise<UserUpdateResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/user/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update user info:', error);
    throw error;
  }
};
