import { DatabaseProductDTO } from '@dtos/ProductDTO';
import { useAd } from '@hooks/useAd';
import { useAuth } from '@hooks/useAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import {
  AlertDialog,
  Avatar,
  HStack,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';

import { useEffect, useRef, useState } from 'react';

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

export const AdDetails = () => {
  const { user } = useAuth();

  const [showExcludeAdConfirmation, setShowExcludeAdConfirmation] =
    useState<boolean>(false);
  const [isLoadingAdData, setIsLoadingAdData] = useState(true);

  const route = useRoute();
  const { adId } = route.params as RouteParamsProps;

  const { adSelected, setAdSelected } = useAd();

  const { goBack } = useNavigation();

  const toast = useToast();
  const excludeConfirmationRef = useRef(null);

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

  function toogleAdActivated() {
    try {
      const ad: DatabaseProductDTO = {
        ...adSelected,
        is_active: !adSelected.is_active,
      };

      api.patch(`/products/${ad.id}`, ad);

      setAdSelected(ad);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Erro ao salvar status. Tente novamente mais tarde.';

      toast.show({
        title,
        duration: 5000,
        placement: 'top',
        bg: 'red.500',
      });
    }
  }

  function handleExcludeAd() {
    try {
      api.delete(`/products/${adSelected.id}`);

      setTimeout(() => {
        goBack();
        setAdSelected({} as DatabaseProductDTO);
      }, 500);

      toast.show({
        title: 'Anúncio excluído com sucesso!',
        placement: 'top',
        duration: 3000,
        bgColor: 'green.500',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Erro ao excluir anúncio. Tente novamente mais tarde.';

      toast.show({
        title,
        duration: 5000,
        placement: 'top',
        bg: 'red.500',
      });
    }
  }

  function toogleShowExcludeAdConfirmation() {
    setShowExcludeAdConfirmation(!showExcludeAdConfirmation);
  }

  useEffect(() => {
    fetchAdDataById(String(adId));
  }, []);

  return (
    <>
      <CommomHeader
        showBackButton
        rigthOption={'edit'}
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
                      uri: `${api.defaults.baseURL}/images/${user.avatar}`,
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

          <VStack
            px={6}
            space={4}
            mb={6}
          >
            <Button
              title={adSelected.is_active ? 'Desativar anúncio' : 'Reativar anúncio'}
              variant={adSelected.is_active ? 'black' : 'blue'}
              iconName="power"
              onPress={toogleAdActivated}
            />

            <Button
              title="Excluir anúncio"
              variant="gray"
              iconName="trash"
              onPress={toogleShowExcludeAdConfirmation}
            />
          </VStack>
        </>
      )}

      <AlertDialog
        leastDestructiveRef={excludeConfirmationRef}
        isOpen={showExcludeAdConfirmation}
        mt={48}
      >
        <AlertDialog.Content>
          <AlertDialog.Header bg="gray.7">
            Confirma a remoção do anúncio?
          </AlertDialog.Header>

          <AlertDialog.Footer
            bg="gray.7"
            // flex={1}
            // pt={10}
            justifyContent="space-between"
            alignItems="flex-end"
          >
            {/* <HStack
              flex={1}
              justifyContent="space-between"
            > */}
            <Button
              title="Cancelar"
              variant="gray"
              onPress={toogleShowExcludeAdConfirmation}
              w="45%"
            >
              Cancel
            </Button>
            <Button
              title="Excluir"
              variant="black"
              w="45%"
              onPress={handleExcludeAd}
            >
              Delete
            </Button>
            {/* </HStack> */}
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};
