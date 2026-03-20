import { apiClient } from '@/shared/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const authApi = {
  login: (payload: LoginRequest) =>
    apiClient.post<LoginResponse>('/api/users/login', payload),
};