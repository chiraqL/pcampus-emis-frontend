import { AUTH_TOKEN_KEY } from '@constants/auth';
import { isBrowser } from '@utils/windowType';
import React, { ReactNode, useCallback, useContext, useState } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  updateToken(token: string): void;
}

const updateToken = (newToken: string) => {
  if (!isBrowser) {
    return () => undefined;
  }

  if (!newToken) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    localStorage.setItem(AUTH_TOKEN_KEY, newToken);
  }
};

const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
  updateToken: updateToken,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(
    isBrowser && localStorage.getItem(AUTH_TOKEN_KEY)
  );

  const handleUpdateToken = useCallback(
    (newToken: string) => {
      setToken(newToken);
      updateToken(newToken);
    },
    [setToken]
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        updateToken: handleUpdateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};