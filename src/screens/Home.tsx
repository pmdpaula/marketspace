// import { PaymentMethodsDTO } from '@dtos/PaymentsMethodDTO';
import { ProductDTO } from '@dtos/ProductDTO';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { TabNavigatorRoutesProps } from '@routes/tabs.routes';
import api from '@services/api';
import {
  Divider,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import { ArrowRight, MagnifyingGlass, Sliders, Tag } from 'phosphor-react-native';

import { useCallback, useEffect, useState } from 'react';

import { AdCard } from '@components/AdCard';
import {
  AdFiltersForm,
  FilterObjectType,
  defaultFiltersValues,
} from '@components/AdFiltersForm';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import defaulAvatarImg from '@assets/avatar.png';

const products: ProductDTO[] = [
  {
    id: '46df47e7-d7b3-47e5-8870-7d5068105c20',
    name: 'Luminária Pendente',
    description: 'Essa é a melhor luminária do mundo. Você não vai se arrepender',
    is_new: true,
    price: 450,
    accept_trade: true,
    payment_methods: ['pix', 'card', 'boleto', 'cash', 'deposit'],
    user_id: 'd20c858a-849c-4d0f-8082-00e93b20dd0c',
    is_active: true,
    created_at: '2022-11-14T23:54:58.968Z',
    updated_at: '2022-11-14T23:54:58.968Z',
  },
  {
    id: '35af42c3-80e8-4c68-998d-144b942e7e8a',
    name: 'Cadeira de Escritório',
    description:
      'A cadeira mais confortável para passar horas trabalhando sem sentir dor nas costas',
    is_new: false,
    price: 149.9,
    accept_trade: false,
    payment_methods: ['pix', 'deposit'],
    user_id: '21f9f4c4-4ab4-4da4-b7ee-cd14c4f30335',
    is_active: true,
    created_at: '2022-10-02T18:23:15.342Z',
    updated_at: '2022-10-02T18:23:15.342Z',
  },
  {
    id: 'b84e0d98-62b6-4b7a-9d36-2b4e96469f0a',
    name: 'Fone de Ouvido Bluetooth',
    description: 'O melhor som de qualidade em um fone de ouvido sem fio',
    is_new: true,
    price: 899.0,
    accept_trade: true,
    payment_methods: ['cash', 'deposit'],
    user_id: 'e2bfb4f2-4a4e-4c1b-a7e4-4c7198b93ccf',
    is_active: true,
    created_at: '2022-12-05T11:11:21.777Z',
    updated_at: '2022-12-05T11:11:21.777Z',
  },
  {
    id: '87c8fc79-0fc6-4440-9d71-3998d92dc9e6',
    name: 'Panela de Pressão Elétrica',
    description:
      'Cozinhe mais rápido e de forma fácil com essa panela de pressão elétrica',
    is_new: false,
    price: 289.9,
    accept_trade: false,
    payment_methods: ['pix', 'cash'],
    user_id: 'f1767a87-b365-4c7f-bcf4-3e19450b3d5a',
    is_active: true,
    created_at: '2022-09-19T07:44:03.456Z',
    updated_at: '2022-09-19T07:44:03.456Z',
  },
  {
    id: 'fbf6da1e-9f15-44a8-9500-909f11b6f1c6',
    name: 'Notebook Gamer',
    description: 'O notebook mais poderoso para jogar seus jogos favoritos',
    is_new: true,
    price: 7999.0,
    accept_trade: true,
    payment_methods: ['boleto', 'deposit'],
    user_id: 'c21a1d22-9292-4c0a-8e8a-34fc07d12188',
    is_active: true,
    created_at: '2023-01-30T14:07:01.321Z',
    updated_at: '2023-01-30T14:07:01.321Z',
  },
];

export const Home = () => {
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [currentFiltersValues, setCurrentFiltersValues] =
    useState<FilterObjectType>(defaultFiltersValues);
  // const [myAds, setMyAds] = useState<ProductDTO[]>([]);
  const [ads, setAds] = useState<ProductDTO[]>(products);
  const [adsFiltered, setAdsFiltered] = useState<ProductDTO[]>(products);
  const [isLoadingFilteredAds, setIsLoadingFilteredAds] = useState(false);

  const { user, userAds, isLoadingUserAds } = useAuth();
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { navigate: navigateTab } = useNavigation<TabNavigatorRoutesProps>();

  function goToNewAd() {
    navigate('newAd');
  }

  // async function getMyAdsData() {
  //   const response = await api.get('/users/products');
  //   setMyAds(response.data);
  // }

  // open bottom modal to filter ads
  function handleIsOpenFilterModal() {
    setIsOpenFilterModal(!isOpenFilterModal);
  }

  function handleFilteredAds() {
    const filteredAds = ads.filter((ad) => {
      if (currentFiltersValues.showNew && !currentFiltersValues.showUsed) {
        return ad.is_new;
        // return ad;
      }
      if (!currentFiltersValues.showNew && currentFiltersValues.showUsed) {
        return !ad.is_new;
        // return ad;
      }
      // if (currentFiltersValues.showNew && currentFiltersValues.showUsed) {
      //   return ad;
      // }
      if (currentFiltersValues.acceptTrade) {
        return ad.accept_trade;
        // return ad;
      }

      ad.payment_methods.forEach((paymentMethod) => {
        if (currentFiltersValues.paymentMethods.includes(paymentMethod)) {
          return ad.payment_methods;
        }
      });

      // if (
      //   currentFiltersValues.paymentMethods.length !==
      //   defaultFiltersValues.paymentMethods.length
      // ) {
      //   ad.payment_methods.forEach((paymentMethod: PaymentMethodsDTO) => {
      //     if (currentFiltersValues.paymentMethods.includes(paymentMethod)) {
      //       return ad.payment_methods[paymentMethod];
      //     }
      //   });
      // }

      setIsLoadingFilteredAds(false);
      return ad;
    });

    setAdsFiltered(filteredAds);

    console.log(
      '🚀 ~ file: Home.tsx:150 ~ filteredAds ~ filteredAds:',
      filteredAds.length,
    );
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     getMyAdsData();
  //   }, []),
  // );

  return (
    <>
      <VStack
        flex={1}
        px={6}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <VStack py={20}>
            {/* Header */}
            <HStack
              justifyContent="space-between"
              mb={6}
            >
              <Image
                source={
                  user.avatar
                    ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
                    : defaulAvatarImg
                }
                alt="imagem do usuário"
                size={12}
                rounded="full"
                borderWidth={2}
                borderColor="primary.400"
                mr={2}
              />

              <VStack flex={1}>
                <Text fontFamily="body">Boas vindas,</Text>
                <Text
                  fontFamily="heading"
                  bold
                >
                  {user.name.split(' ')[0]}!
                </Text>
              </VStack>

              <Button
                title="Criar Anúncio"
                onPress={goToNewAd}
                w="auto"
                variant="black"
                // ButtonIcon={<Plus />}
                iconName="plus"
              >
                Criar anúncio
              </Button>
            </HStack>

            <Text
              fontFamily="body"
              fontSize="sm"
            >
              Seus produtos anunciados para venda
            </Text>

            {/* light blue box */}
            <HStack
              mt={2}
              bg={'rgba(100, 122, 199, 0.1)'}
              rounded="md"
              w="100%"
              alignItems="center"
              py={3}
              px={4}
            >
              {isLoadingUserAds ? (
                <Spinner />
              ) : (
                <>
                  <Tag color={colors.primary[400]} />

                  <VStack
                    ml={4}
                    flex={1}
                  >
                    <Text
                      fontFamily="heading"
                      fontWeight="600"
                      fontSize="lg"
                    >
                      {userAds.filter((userAd) => userAd.is_active).length}
                    </Text>

                    <Text fontSize="xs">Anúncios ativos</Text>
                  </VStack>

                  <HStack alignItems="center">
                    <Pressable
                      onPress={() => {
                        navigateTab('userAds', { userAds });
                      }}
                    >
                      <Text
                        fontSize="xs"
                        fontFamily={'heading'}
                        mr={2}
                        color={colors.primary[400]}
                      >
                        Meus anúncios
                      </Text>
                    </Pressable>
                    <ArrowRight color={colors.primary[400]} />
                  </HStack>
                </>
              )}
            </HStack>

            <Text
              fontFamily="body"
              fontSize="sm"
              mt={8}
              mb={2}
            >
              Compre produtos variados
            </Text>

            <Input
              bg="gray.7"
              h={14}
              p={4}
              borderWidth={0}
              fontSize="md"
              color="gray.2"
              fontFamily="body"
              mb={6}
              rounded="md"
              placeholder="Buscar anúncio"
              placeholderTextColor="gray.4"
              _invalid={{
                borderWidth: 1,
                borderColor: 'red.500',
              }}
              _focus={{
                bg: 'gray.7',
                borderWidth: 1,
                borderColor: 'gray.3',
              }}
              InputRightElement={
                <>
                  <Pressable>
                    <MagnifyingGlass
                      color="#5F5B62"
                      weight="bold"
                    />
                  </Pressable>

                  <Divider
                    orientation="vertical"
                    h={8}
                    mx={3}
                    color="gray.4"
                  />

                  <Pressable
                    mr={2}
                    onPress={handleIsOpenFilterModal}
                  >
                    <Sliders
                      color="#5F5B62"
                      weight="bold"
                    />
                  </Pressable>
                </>
              }
            />

            <HStack
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {!isLoadingFilteredAds ? (
                adsFiltered.map((ad) => {
                  return (
                    <AdCard
                      key={ad.id}
                      data={ad}
                    />
                  );
                })
              ) : (
                <Loading />
              )}
            </HStack>
          </VStack>
        </ScrollView>
      </VStack>

      <Modal
        isOpen={isOpenFilterModal}
        onClose={() => setIsOpenFilterModal(false)}
        safeAreaTop={true}
        size={'full'}
      >
        <Modal.Content
          h="582"
          mb={0}
          mt="auto"
          roundedTop="2xl"
          roundedBottom={0}
          bg="gray.6"
          px={6}
          py={8}
        >
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={6}
          >
            <Text
              fontFamily={'heading'}
              fontSize="lg"
            >
              Filtrar Anúncios
            </Text>
            {/* <Modal.CloseButton color={'gray.6'} /> */}
            <Icon
              as={AntDesign}
              name="close"
              size={6}
              color="gray.4"
              onPress={handleIsOpenFilterModal}
            />
          </HStack>

          <Modal.Body p={0}>
            <AdFiltersForm
              currentFiltersValues={currentFiltersValues}
              setCurrentFiltersValues={setCurrentFiltersValues}
              setIsOpenFilterModal={setIsOpenFilterModal}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
