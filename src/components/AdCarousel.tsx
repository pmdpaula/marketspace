import { DatabaseProductImageDTO } from '@dtos/ProductDTO';
import api from '@services/api';
import { Badge, HStack, Image, Text, ZStack } from 'native-base';
import Carousel from 'react-native-reanimated-carousel';

import { Dimensions } from 'react-native';

type AdCarouselProps = {
  images: DatabaseProductImageDTO[];
  isActive?: boolean;
};

export const AdCarousel = ({ images, isActive = true }: AdCarouselProps) => {
  const squareHeight = 275;

  function handleImageUri(imageUri: string) {
    const uri =
      imageUri.includes('file') || imageUri.includes('http')
        ? imageUri
        : `${api.defaults.baseURL}/images/${imageUri}`;
    return uri;
  }

  return (
    <Carousel
      width={Dimensions.get('window').width}
      height={squareHeight}
      data={images}
      scrollAnimationDuration={1000}
      loop={false}
      renderItem={({ item, index }) => (
        <ZStack
          h={squareHeight}
          alignItems="center"
        >
          <Image
            w="100%"
            h={squareHeight}
            source={{ uri: `${handleImageUri(item.path)}` }}
            alt="Imagem do produto"
          />
          <HStack
            h={squareHeight}
            w="100%"
            px={6}
            justifyContent="center"
            alignItems="flex-end"
            space={3}
            pb={1}
          >
            {images.map((subItem, subIndex) => (
              <Badge
                key={subItem.id}
                minW="28%"
                rounded="xs"
                bg="gray.6"
                style={{ opacity: subIndex === index ? 0.7 : 0.3 }}
              />
            ))}
          </HStack>

          {!isActive && (
            <Badge
              bg="gray.2"
              opacity={0.8}
              h={275}
              w="100%"
            >
              <Text
                color="gray.7"
                fontFamily="heading"
              >
                AÚNCIO DESATIVADO
              </Text>
            </Badge>
          )}
        </ZStack>
      )}
    />
  );
};
