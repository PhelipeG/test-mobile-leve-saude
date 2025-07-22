import { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';
import { login, logout, register } from '@/services/authService';

export function useAuth() {
  const { user, loading } = useContext(AuthContext);

  async function signIn(email: string, password: string) {
    return login(email, password);
  }

  async function signUp(email: string, password: string) {
    return register(email, password);
  }

  async function signOut() {
    return logout();
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
