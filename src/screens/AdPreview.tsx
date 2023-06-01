import { FullNewAdDTO, NewAdDTO, NewAdImageDTO } from '@dtos/NewAdDTO';
import { PaymentMethodsDTO } from '@dtos/PaymentsMethodDTO';
import { DatabaseProductImageDTO } from '@dtos/ProductDTO';
import { useAd } from '@hooks/useAd';
import { useAuth } from '@hooks/useAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import { translateAcceptTrade } from '@utils/translateAcceptTrade';
import { translatePaymentMethod } from '@utils/translatePaymentMethod';
import {
  Avatar,
  HStack,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  ZStack,
  useToast,
} from 'native-base';
import uuid from 'react-native-uuid';

import { useEffect, useState } from 'react';

import { AdBadge } from '@components/AdBadge';
import { AdCarousel } from '@components/AdCarousel';
import { Button } from '@components/Button';
import { PaymentMethodIcon } from '@components/PaymentMethodIcon';

type RouteParamsProps = {
  fullAdData: FullNewAdDTO;
};

export const AdPreview = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const { setAdSelected } = useAd();
  const route = useRoute();
  const { fullAdData } = route.params as RouteParamsProps;
  const { goBack, navigate, getState } = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  // const isEditingAd: boolean = routes.forEach(
  //   (route) => route.name === 'adEdit',
  const { routes } = getState();
  const isEditingAd = routes.filter((route) => route.name === 'adEdit').length > 0;
  // console.log('isEditingAd:', isEditingAd);

  function handleBackToEdit() {
    goBack();
  }

  async function handleCreateAd() {
    setIsLoading(true);

    try {
      let response = null;
      // TODO: corrigir erro na edição de anúncio
      if (isEditingAd) {
        response = await api.put('/products', fullAdData.newAd as NewAdDTO);

        console.log(
          '🚀 ~ file: AdPreview.tsx:65 ~ handleCreateAd ~ response:',
          response.data,
        );
      } else {
        response = await api.post('/products', fullAdData.newAd as NewAdDTO);
      }
      // const { id: newAdId } = response.data;

      const { data: createdAd } = await api.get(`/products/${response.data.id}`);

      if (fullAdData.newAdImages.length > 0) {
        const newAdImages = new FormData();

        newAdImages.append('product_id', createdAd.id);

        for (const image of fullAdData.newAdImages) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          newAdImages.append('images', image as any);
        }

        try {
          await api.post('/products/images', newAdImages, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : 'Erro ao inserir as imagens do anúncio.';

          toast.show({
            title,
            duration: 5000,
            placement: 'top',
            bg: 'red.500',
          });
        }
      }

      // await fetchUserAdsData();
      setAdSelected(createdAd);

      toast.show({
        title: isEditingAd
          ? 'Anúncio editado com sucesso!'
          : 'Anúncio criado com sucesso!',
        bgColor: 'green.500',
        duration: 5000,
        placement: 'top',
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate('adDetails', { adId: createdAd.id });
      }, 500);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Erro ao criar anúncio. Tente novamente mais tarde.';

      toast.show({
        title,
        duration: 5000,
        placement: 'top',
        bg: 'red.500',
      });

      setTimeout(() => {
        setIsLoading(false);
        // navigate('ad', { adId: createdAd.id });
      }, 500);
    }
  }

  function transformImageListToCarouselList(
    imageList: NewAdImageDTO[],
  ): DatabaseProductImageDTO[] {
    const carouselList = imageList.map((image) => ({
      id: image.id || String(uuid.v4()),
      path: image.uri,
    }));

    return carouselList;
  }

  function transformPaymentMethodsToDatabaseFormat(
    newAdPaymentMethods: PaymentMethodsDTO[],
  ) {
    const transformedPaymentMethods = newAdPaymentMethods.map((paymentMethod) => ({
      id: paymentMethod,
      key: paymentMethod,
      name: translatePaymentMethod(paymentMethod),
    }));

    return transformedPaymentMethods;
  }

  useEffect(() => {
    // console.log(
    //   '🚀 ~ file: AdPreview.tsx:88 ~ AdPreview ~ fullAdData.newAdImages:',
    //   fullAdData.newAdImages,
    // );
    console.log('\n\n');

    // console.log('🚀 ~ file: AdPreview.tsx:44 ~ AdPreview ~ getState:');
    // const { routes } = getState();

    // const filterRoutes = routes.filter((route) => route.name === 'adNew');

    // const respLog = filterRoutes();

    // console.log('🚀 ~ file: AdPreview.tsx:168 ~ useEffect ~ respLog:', filterRoutes);

    console.log('🚀 ~ file: AdPreview.tsx:166 ~ useEffect ~ isEditingAd:', isEditingAd);

    getState().routes.forEach((route) => console.log(route.name));
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack>
          <VStack
            bg="bluelight"
            h={48}
            justifyContent={'center'}
            alignItems={'center'}
            pt={8}
          >
            <Text
              color="gray.7"
              fontFamily="body"
              fontWeight="bold"
            >
              Pré visualização do anúncio
            </Text>
            <Text
              color="gray.7"
              fontFamily="body"
            >
              É assim que seu produto vai aparecer!
            </Text>
          </VStack>

          {fullAdData.newAdImages.length > 0 ? (
            // <ScrollView
            //   horizontal
            //   showsHorizontalScrollIndicator
            //   pr={12}
            //   mt={-8}
            //   h={280}
            // >
            //   {fullAdData.newAdImages.map((image) => (
            //     <ImageBox
            //       key={image.id}
            //       imageData={image}
            //     />
            //   ))}
            // </ScrollView>
            <AdCarousel
              images={transformImageListToCarouselList(fullAdData.newAdImages)}
            />
          ) : (
            <ZStack
              h={275}
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Skeleton
                h="100%"
                w="100%"
                startColor="primary.100"
                fadeDuration={0.2}
              />
              <Text
                fontFamily="heading"
                fontSize="xl"
                color="gray.4"
              >
                Sem Imagem
              </Text>
            </ZStack>
          )}

          <VStack
            px={4}
            mt={4}
            mb={12}
          >
            <HStack
              space={3}
              alignItems={'center'}
              mb={4}
            >
              <Avatar
                size={6}
                borderColor="bluelight"
                borderWidth={2}
                source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
              />

              <Text
                color="gray.1"
                fontFamily="heading"
              >
                {user.name}
              </Text>
            </HStack>

            <AdBadge
              isNew={fullAdData.newAd.is_new}
              mb={4}
            />

            <HStack
              justifyContent={'space-evenly'}
              flexWrap={'nowrap'}
              h={26}
              mb={4}
            >
              <Text
                fontFamily="heading"
                fontSize="lg"
                w="75%"
              >
                {fullAdData.newAd.name}
              </Text>

              <Text
                color="bluelight"
                size="2xl"
                fontFamily="heading"
                w="25%"
                textAlign="right"
              >
                {fullAdData.newAd.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  currencyDisplay: 'symbol',
                })}
              </Text>
            </HStack>

            <Text
              fontFamily="body"
              mb={4}
            >
              {fullAdData.newAd.description}
            </Text>

            <HStack
              space={2}
              mb={4}
            >
              <Text
                fontFamily="body"
                fontWeight="bold"
              >
                Aceita troca?
              </Text>

              <Text fontFamily="body">
                {translateAcceptTrade(fullAdData.newAd.accept_trade)}
              </Text>
            </HStack>

            <VStack>
              <VStack>
                <Text
                  fontFamily="body"
                  fontWeight="bold"
                  mb={2}
                >
                  Meios de Pagamento:
                </Text>

                {transformPaymentMethodsToDatabaseFormat(
                  fullAdData.newAd.payment_methods,
                ).map((paymentMethod) => (
                  <PaymentMethodIcon
                    key={paymentMethod.key}
                    paymentMethod={paymentMethod}
                  />
                ))}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack
        bg="gray.100"
        justifyContent="space-between"
        alignItems="center"
        px={6}
        py={5}
      >
        <Button
          title="Voltar e editar"
          variant="gray"
          w="48%"
          iconName="left"
          onPress={handleBackToEdit}
        />
        <Button
          title="Publicar"
          variant="blue"
          w="48%"
          iconName="tag"
          onPress={handleCreateAd}
          isLoading={isLoading}
        />
      </HStack>
    </>
  );
};
