import { DatabaseProductDTO } from '@dtos/ProductDTO';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import api from '@services/api';
import { Avatar, Badge, HStack, Text, VStack, ZStack } from 'native-base';

import { ImageBackground, Pressable } from 'react-native';

import { AdBadge } from './AdBadge';
import { AdPrice, AdPriceProps } from './AdPrice';

type AdCardProps = {
  data: DatabaseProductDTO;
  priceColor?: AdPriceProps['color'];
};

export const AdCard = ({ data, priceColor = 'blue' }: AdCardProps) => {
  const { user } = useAuth();

  const isUserOwner = data.user_id === user.id;
  const isAdActive = data.is_active === true || data.is_active === undefined;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleClickCard() {
    if (isUserOwner) {
      navigate('adDetails', { adId: data.id });
    } else {
      navigate('adView', { adId: data.id });
    }
  }

  return (
    <VStack
      borderTopRadius={8}
      mb={6}
      w="46%"
    >
      <Pressable onPress={handleClickCard}>
        <ZStack
          rounded="md"
          overflow="hidden"
          h={100}
        >
          <ImageBackground
            source={{
              uri: `${api.defaults.baseURL}/images/${data.product_images[0]?.path}`,
            }}
            resizeMode="cover"
          >
            <HStack
              justifyContent={isUserOwner ? 'flex-end' : 'space-between'}
              alignItems="flex-start"
              w="100%"
              h={100}
              p={1}
            >
              {!isUserOwner && (
                <Avatar
                  source={{ uri: `${api.defaults.baseURL}/images/${data.user.avatar}` }}
                  rounded="full"
                  w={6}
                  h={6}
                  borderWidth={1}
                  borderColor="white"
                />
              )}

              <AdBadge isNew={data.is_new} />
            </HStack>
          </ImageBackground>
          {!isAdActive && (
            <ZStack
              h={100}
              w="100%"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              <Badge
                h={100}
                w="100%"
                bg="gray.2"
                opacity={0.5}
              />
              <Text
                fontFamily="heading"
                color="white"
                pl={1}
              >
                ANÚNCIO DESATIVADO
              </Text>
            </ZStack>
          )}
        </ZStack>

        <Text
          fontFamily="body"
          color={isAdActive ? 'gray.2' : 'gray.4'}
          fontSize="md"
          mt={1}
        >
          {data.name}
        </Text>

        <AdPrice
          price={data.price}
          color={priceColor}
        />
      </Pressable>
    </VStack>
  );
};
