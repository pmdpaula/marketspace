import { DatabaseProductDTO } from '@dtos/ProductDTO';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import { useToast } from 'native-base';

import { ReactNode, createContext, useState } from 'react';

export type AdContextDataProps = {
  userAds: DatabaseProductDTO[];
  setUserAds: (userAds: DatabaseProductDTO[]) => void;
  isLoadingUserAds: boolean;
  fetchUserAdsData: () => Promise<void>;
  // adId: string; //DatabaseProductDTO['id'];
  // setAdId: (adId: string) => void;
  // fetchAdDataById: (id: DatabaseProductDTO['id']) => Promise<DatabaseProductDTO | void>;
  // isLoadingAdData: boolean;
  // setIsLoadingAdData: (isLoadingAdData: boolean) => void;
  adSelected: DatabaseProductDTO;
  setAdSelected: (ad: DatabaseProductDTO) => void;
};

type AdContextProviderProps = {
  children: ReactNode;
};

export const AdContext = createContext<AdContextDataProps>({} as AdContextDataProps);

export const AdContextProvider = ({ children }: AdContextProviderProps) => {
  // const [adId, setAdId] = useState<string>('');
  // const [isLoadingAdData, setIsLoadingAdData] = useState(true);
  const [userAds, setUserAds] = useState<DatabaseProductDTO[]>([]);
  const [isLoadingUserAds, setIsLoadingUserAds] = useState(true);
  const [adSelected, setAdSelected] = useState<DatabaseProductDTO>(
    {} as DatabaseProductDTO,
  );

  const toast = useToast();

  async function fetchUserAdsData() {
    setIsLoadingUserAds(true);

    try {
      const response = await api.get('/users/products');

      setUserAds(response.data);
      setIsLoadingUserAds(false);
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
      setIsLoadingUserAds(false);
    }
  }

  // async function fetchAdDataById(id: DatabaseProductDTO['id']) {
  //   setIsLoadingAdData(true);

  //   try {
  //     const response = await api.get(`/products/${id}`);
  //     const data = (await response.data) as DatabaseProductDTO;

  //     console.log('🚀 ~ file: AdContext.tsx:70 ~ fetchAdDataById ~ data:', data);

  //     setAdSelected(data);
  //   } catch (error) {
  //     // throw new Error();
  //     const isAppError = error instanceof AppError;
  //     const title = isAppError
  //       ? error.message
  //       : 'Erro ao buscar anúncio. Tente novamente mais tarde.';

  //     toast.show({
  //       title,
  //       duration: 5000,
  //       placement: 'top',
  //       bg: 'red.500',
  //     });
  //   } finally {
  //     setIsLoadingAdData(false);
  //   }
  // }

  return (
    <AdContext.Provider
      value={{
        userAds,
        setUserAds,
        isLoadingUserAds,
        fetchUserAdsData,
        // adId,
        // setAdId,
        // isLoadingAdData,
        adSelected,
        setAdSelected,
        // fetchAdDataById,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};
