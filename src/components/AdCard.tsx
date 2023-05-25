import { ProductDTO } from '@dtos/ProductDTO';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Badge, Box, HStack, Image, Text, VStack } from 'native-base';

import { ImageBackground, Pressable } from 'react-native';

type AdCardProps = {
  data: ProductDTO;
};

export const AdCard = ({ data }: AdCardProps) => {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function goToAdDetails() {
    navigate('adDetails', { product: data });
  }

  return (
    <VStack
      borderTopRadius={8}
      mb={6}
      w="46%"
    >
      <Pressable onPress={goToAdDetails}>
        <Box
          rounded="md"
          overflow="hidden"
        >
          <ImageBackground
            source={{
              uri: 'https://www.guller.com.br/1564-home_default/t%C3%AAnis-vermelho-masculino-esportivo-treinos-casual-fitness-leve-macio-%C3%A1-prova-d%C2%B4%C3%A1gua.jpg',
            }}
            resizeMode="cover"
          >
            <HStack
              justifyContent="space-between"
              alignItems="flex-start"
              w="100%"
              h={100}
              p={1}
            >
              <Image
                source={{ uri: 'https://github.com/pmdpaula.png' }}
                alt="imagem do vendedor"
                rounded="full"
                w={6}
                h={6}
                borderWidth={1}
                borderColor="white"
              />

              <Badge
                rounded="full"
                // bg="gray.2"
                py={0.5}
                px={2}
                bg={data.is_new ? 'primary.400' : 'gray.2'}
              >
                <Text color="white">{data.is_new ? 'NOVO' : 'USADO'}</Text>
              </Badge>
            </HStack>
          </ImageBackground>
        </Box>

        <Text
          fontFamily="body"
          color="gray.2"
          fontSize={14}
          mt={1}
        >
          {data.name}
        </Text>

        <Text
          fontFamily="heading"
          color="gray.1"
          fontSize="xs"
        >
          R${' '}
          <Text
            fontFamily="heading"
            color="gray.1"
            fontSize="lg"
          >
            {data.price.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </Text>
        </Text>
      </Pressable>
    </VStack>
  );
};
