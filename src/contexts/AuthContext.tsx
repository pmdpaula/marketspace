import { UserDTO } from '@dtos/UserDTO';
import api from '@services/api';

import { ReactNode, createContext, useEffect, useState } from 'react';

import {
  storageAuthTokenClear,
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';
import { storageUserClear, storageUserGet, storageUserSave } from '@storage/storageUser';

export type AuthContextDataProps = {
  user: UserDTO;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function updateUserAndToken(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenData(
    userData: UserDTO,
    token: string,
    refresh_token: string,
  ) {
    setIsLoadingUserStorageData(true);

    await storageUserSave(userData);
    await storageAuthTokenSave({ token, refresh_token });

    setIsLoadingUserStorageData(false);
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserStorageData(true);

      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenData(data.user, data.token, data.refresh_token);
        updateUserAndToken(data.user, data.token);
      }
      // eslint-disable-next-line no-useless-catch
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    setIsLoadingUserStorageData(true);

    setUser({} as UserDTO);
    await storageUserClear();
    await storageAuthTokenClear();

    setIsLoadingUserStorageData(false);
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    setUser(userUpdated);
    await storageUserSave(userUpdated);
  }

  async function loadUserData() {
    setIsLoadingUserStorageData(true);

    const userLogged = await storageUserGet();
    const { token } = await storageAuthTokenGet();

    if (token && userLogged) {
      updateUserAndToken(userLogged, token);
    }

    setIsLoadingUserStorageData(false);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUserProfile,
        signIn,
        signOut,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
