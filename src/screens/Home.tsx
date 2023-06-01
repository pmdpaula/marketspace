// import { PaymentMethodsDTO } from '@dtos/PaymentsMethodDTO';
import { DatabaseProductDTO } from '@dtos/ProductDTO';
import { AntDesign } from '@expo/vector-icons';
import { useAd } from '@hooks/useAd';
import { useAuth } from '@hooks/useAuth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { TabNavigatorRoutesProps } from '@routes/tabs.routes';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import {
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
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

export const Home = () => {
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [currentFiltersValues, setCurrentFiltersValues] =
    useState<FilterObjectType>(defaultFiltersValues);
  // const [currentFiltersValues, setCurrentFiltersValues] = useState<FilterObjectType>(
  //   {} as FilterObjectType,
  // );
  const [currentAds, setCurrentAds] = useState<DatabaseProductDTO[]>([]);
  const [isLoadingAds, setIsLoadingAds] = useState(false);
  const [queryString, setQueryString] = useState<string>('');

  const { user } = useAuth();
  const { userAds, fetchUserAdsData, isLoadingUserAds } = useAd();
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { navigate: navigateTab } = useNavigation<TabNavigatorRoutesProps>();

  const toast = useToast();

  function goToNewAd() {
    navigate('adNew');
  }

  async function fetchAds() {
    setIsLoadingAds(true);

    const { showNew, showUsed, acceptTrade, paymentMethods } = currentFiltersValues;
    const queryAcceptTrade = `accept_trade=${acceptTrade}`;
    const queryIsNew =
      showNew && showUsed ? '' : showNew && !showUsed ? 'is_new=true' : 'is_new=false';

    let queryPaymentMethods = '';
    if (paymentMethods.length > 0) {
      paymentMethods.map(
        (method) =>
          (queryPaymentMethods = `${queryPaymentMethods}&payment_methods=${method}`),
      );
    }

    const searchQuery = queryString ? `query=${queryString}` : '';

    try {
      const response = await api.get(
        `/products/?${queryAcceptTrade}&${queryIsNew}&${queryPaymentMethods}&${searchQuery}`,
      );

      setCurrentAds(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Erro ao carregar os anúncios. Tente novamente mais tarde.';

      toast.show({
        title,
        duration: 5000,
        placement: 'top',
        bg: 'red.500',
      });
    } finally {
      setIsLoadingAds(false);
    }
  }

  // open bottom modal to filter currentAds
  function handleIsOpenFilterModal() {
    setIsOpenFilterModal(!isOpenFilterModal);
  }

  useEffect(() => {
    // console.log(
    //   '🚀 ~ file: Home.tsx:114 ~ fetchAds ~ currentFiltersValues:',
    //   currentFiltersValues,
    // );
    fetchUserAdsData();
    fetchAds();
  }, []);

  useEffect(() => {
    fetchAds();
  }, [currentFiltersValues]);

  useFocusEffect(
    useCallback(() => {
      fetchUserAdsData();
      fetchAds();
      // console.log(
      //   '🚀 ~ file: Home.tsx:134 ~ Home ~ currentFiltersValues:',
      //   currentFiltersValues,
      // );
    }, []),
  );

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
              h={66}
              justifyContent="center"
              alignItems="center"
              py={3}
              px={4}
            >
              <Tag color={colors.primary[400]} />

              <VStack
                ml={4}
                flex={1}
              >
                {isLoadingUserAds ? (
                  <Box
                    alignItems="flex-start"
                    h={7}
                  >
                    <Loading size="sm" />
                  </Box>
                ) : (
                  <Text
                    fontFamily="heading"
                    fontWeight="600"
                    fontSize="lg"
                  >
                    {userAds.length > 0 ? userAds.filter((ad) => ad.is_active).length : 0}
                  </Text>
                )}

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
              onChangeText={setQueryString}
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
                  <Pressable onPress={fetchAds}>
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
              {!isLoadingAds ? (
                currentAds.map((ad) => {
                  return (
                    <AdCard
                      key={ad.id}
                      data={ad}
                    />
                  );
                })
              ) : (
                <Loading size="lg" />
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
