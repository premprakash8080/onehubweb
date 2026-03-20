import { apiClient } from '@/shared/api/client';

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = unknown;

export function loginUser(payload: LoginRequest) {
  return apiClient.post<LoginResponse>('/api/users/login', payload);
}
