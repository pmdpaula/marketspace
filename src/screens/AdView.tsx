import { DatabaseProductDTO } from '@dtos/ProductDTO';
import { useAd } from '@hooks/useAd';
import { useAuth } from '@hooks/useAuth';
import { useRoute } from '@react-navigation/native';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import { Avatar, Box, HStack, ScrollView, Text, VStack, useToast } from 'native-base';

import { useEffect, useState } from 'react';

import { AdBadge } from '@components/AdBadge';
import { AdCarousel } from '@components/AdCarousel';
import { AdPrice } from '@components/AdPrice';
import { Button } from '@components/Button';
import { CommomHeader } from '@components/CommomHeader';
import { Loading } from '@components/Loading';
import { PaymentMethodIcon } from '@components/PaymentMethodIcon';

type RouteParamsProps = {
  adId?: DatabaseProductDTO['id'];
};

export const AdView = () => {
  const { user } = useAuth();

  const [isLoadingAdData, setIsLoadingAdData] = useState(true);

  const route = useRoute();
  const { adId } = route.params as RouteParamsProps;

  const { adSelected, setAdSelected } = useAd();

  const toast = useToast();

  async function fetchAdDataById(id: DatabaseProductDTO['id']) {
    setIsLoadingAdData(true);

    try {
      const response = await api.get(`/products/${id}`);
      const data = (await response.data) as DatabaseProductDTO;

      setAdSelected(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Erro ao buscar anúncio. Tente novamente mais tarde.';

      toast.show({
        title,
        duration: 5000,
        placement: 'top',
        bg: 'red.500',
      });
    } finally {
      setIsLoadingAdData(false);
    }
  }

  function handleMakeContact() {
    toast.show({
      title: 'Entrando em contato com o vendedor...\nRecurso não implementado ainda.',
      placement: 'top',
      duration: 2000,
      bg: 'green.500',
    });
  }

  useEffect(() => {
    fetchAdDataById(String(adId));
  }, []);

  return (
    <>
      <CommomHeader
        showBackButton
        px={6}
        mb={3}
      />

      {!adSelected.id && isLoadingAdData ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <VStack>
              <AdCarousel
                images={adSelected.product_images}
                isActive={adSelected.is_active}
              />

              <VStack
                px={4}
                mt={4}
                space={3}
              >
                <HStack
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Avatar
                    source={{
                      uri: `${api.defaults.baseURL}/images/${adSelected.user.avatar}`,
                    }}
                    size="sm"
                    bg="primary.400"
                    mr={3}
                  />

                  <Text fontFamily="body">{user.name}</Text>
                </HStack>

                <AdBadge isNew={adSelected.is_new} />

                <HStack
                  justifyContent={'space-evenly'}
                  flexWrap={'nowrap'}
                  h={26}
                >
                  <Text
                    fontFamily="heading"
                    fontSize="lg"
                    w="75%"
                  >
                    {adSelected.name}
                  </Text>

                  <AdPrice price={adSelected.price} />
                </HStack>

                <Text>{adSelected.description}</Text>

                <HStack
                  space={3}
                  h={26}
                  mb={2}
                >
                  <Text fontFamily="heading">Aceita troca?</Text>
                  <Text fontFamily="body">{adSelected.accept_trade ? 'Sim' : 'Não'}</Text>
                </HStack>

                <VStack>
                  <Text
                    fontFamily="heading"
                    mb={3}
                  >
                    Meio de Pagamento:
                  </Text>

                  {adSelected.payment_methods.map((paymentMethod) => (
                    <PaymentMethodIcon
                      key={paymentMethod.key}
                      paymentMethod={paymentMethod}
                    />
                  ))}
                </VStack>
              </VStack>
            </VStack>
          </ScrollView>

          <HStack
            w="100%"
            px={4}
            py={6}
            bg="gray.7"
          >
            <Box w="47%">
              <AdPrice
                price={adSelected.price}
                color="blue"
              />
            </Box>

            <Button
              title="Entrar em contato"
              iconName="whatsapp"
              w="47%"
              onPress={handleMakeContact}
            />
          </HStack>
        </>
      )}
    </>
  );
};
