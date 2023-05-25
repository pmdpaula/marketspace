import { FullNewAdDTO, NewAdDTO } from '@dtos/NewAdDTO';
import { useAuth } from '@hooks/useAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TabNavigatorRoutesProps } from '@routes/tabs.routes';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import { PaymentMethodIcon } from '@utils/PaymentMethodIcon';
import { translateAcceptTrade } from '@utils/translateAcceptTrade';
import { translateProductCondition } from '@utils/translateProductCondition';
import {
  Avatar,
  Badge,
  HStack,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';

// import Carousel from 'react-native-reanimated-carousel';
import { useEffect, useState } from 'react';

import { Button } from '@components/Button';
import { ImageBox } from '@components/ImageBox';

type RouteParamsProps = {
  fullNewAd: FullNewAdDTO;
};

export const PreviewNewAd = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const route = useRoute();
  const { fullNewAd } = route.params as RouteParamsProps;
  const { goBack, navigate } = useNavigation<TabNavigatorRoutesProps>();
  const toast = useToast();

  function handleBackToEdit() {
    goBack();
  }

  async function handleCreateAd() {
    setIsLoading(true);

    try {
      const response = await api.post('/products', fullNewAd.newAd as NewAdDTO);
      const { id: newAdId } = response.data;

      if (fullNewAd.newAdImages.length > 0) {
        const newAdImages = new FormData();

        newAdImages.append('product_id', newAdId);

        for (const image of fullNewAd.newAdImages) {
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

      toast.show({
        title: 'Anúncio criado com sucesso!',
        bgColor: 'green.500',
        duration: 5000,
        placement: 'top',
      });

      setIsLoading(false);

      setTimeout(() => {
        navigate('home');
      }, 3000);
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
    }
  }

  useEffect(() => {
    console.log(
      '🚀 ~ file: PreviewNewAd.tsx:88 ~ PreviewNewAd ~ fullNewAd.newAdImages:',
      fullNewAd.newAdImages,
    );
  }, [fullNewAd.newAdImages]);

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

          {fullNewAd.newAdImages.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              pr={12}
              mt={-8}
              h={280}
            >
              {fullNewAd.newAdImages.map((image) => (
                <ImageBox
                  key={image.id}
                  imageData={image}
                />
              ))}
            </ScrollView>
          ) : (
            <Skeleton
              h="280"
              w="100%"
              startColor="primary.100"
              fadeDuration={0.2}
            />
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
                fontFamily="body"
              >
                {user.name}
              </Text>
            </HStack>

            <Badge
              bg="gray.5"
              rounded="full"
              maxWidth={100}
              mb={4}
            >
              <Text
                fontFamily="body"
                fontWeight="600"
                color="gray.2"
              >
                {translateProductCondition(fullNewAd.newAd.is_new)}
              </Text>
            </Badge>

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
                {fullNewAd.newAd.name}
              </Text>

              <Text
                color="bluelight"
                size="2xl"
                fontFamily="heading"
                w="25%"
                textAlign="right"
              >
                {fullNewAd.newAd.price.toLocaleString('pt-BR', {
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
              {fullNewAd.newAd.description}
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
                {translateAcceptTrade(fullNewAd.newAd.accept_trade)}
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

                {fullNewAd.newAd.payment_methods.map((paymentMethod) => (
                  <PaymentMethodIcon
                    key={paymentMethod}
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
