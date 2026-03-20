import { useState } from 'react';
import { ApiError } from '@/shared/api';
import { authApi, type LoginRequest } from '@/shared/api/auth';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (payload: LoginRequest) => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await authApi.login(payload);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('Unable to login right now. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    errorMessage,
  };
}
