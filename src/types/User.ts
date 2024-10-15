export interface User {
  username?: string;
  nickname: string;
  email: string;
  phoneNumber?: string;
  birth?: string; // Date일수도 있음
  gender?: 'GENDER_MALE' | 'GENDER_FEMALE';
}

export interface UserResponse {
  code: string;
  message: string;
  data: User;
}

export interface UserUpdateRequest {
  username?: string;
  nickname?: string;
  phoneNumber?: string;
  birth?: string; // Date일수도 있음
  gender?: 'GENDER_MALE' | 'GENDER_FEMALE';
}

export interface UserUpdateResponse {
  code: string;
  message: string;
  data: {
    userId: number;
  };
}

export interface UserTimeResponse {
  code: 'string';
  message: 'string';
  data: {
    createdAt: 'string';
    updatedAt: 'string';
  };
}
