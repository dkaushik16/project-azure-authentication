/**
 * useAuth Hook
 * 
 * Custom React hook that provides authentication functionality
 * and user information based on MSAL context.
 * 
 * Usage:
 *   const { user, isLoading, handleLogin, handleLogout } = useAuth();
 */

import { useCallback, useState } from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { initiateLogin, initiateLogout, formatAuthError } from '../services/authService';

export const useAuth = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = accounts?.[0] || null;

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await initiateLogin(instance, loginRequest);
    } catch (err) {
      const formattedError = formatAuthError(err);
      setError(formattedError);
      console.error('Login failed:', formattedError);
    } finally {
      setIsLoading(false);
    }
  }, [instance]);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await initiateLogout(instance, { postLogoutRedirectUri: '/' });
    } catch (err) {
      const formattedError = formatAuthError(err);
      setError(formattedError);
      console.error('Logout failed:', formattedError);
    } finally {
      setIsLoading(false);
    }
  }, [instance]);

  return {
    isAuthenticated,
    isLoading,
    error,
    user,
    accounts,
    instance,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
