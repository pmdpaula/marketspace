import { ProductDTO } from '@dtos/ProductDTO';
import { UserDTO } from '@dtos/UserDTO';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import { useToast } from 'native-base';

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
  userAds: ProductDTO[];
  setUserAds: (userAds: ProductDTO[]) => void;
  isLoadingUserAds: boolean;
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
  const [userAds, setUserAds] = useState<ProductDTO[]>([]);
  const [isLoadingUserAds, setIsLoadingUserAds] = useState(true);

  const toast = useToast();

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

  async function getUserAdsData() {
    setIsLoadingUserAds(true);

    try {
      const response = await api.get('/users/products');

      setUserAds(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Erro ao ler dados de anúncio do usuário. Reinicie o aplicativo.';

      toast.show({
        title,
        duration: 5000,
        placement: 'top',
        bg: 'red.500',
      });
    } finally {
      setIsLoadingUserAds(false);
    }
  }

  useEffect(() => {
    loadUserData();
    getUserAdsData();
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
        userAds,
        setUserAds,
        isLoadingUserAds,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
