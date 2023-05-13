import { ProductDTO } from '@dtos/ProductDTO';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Box, HStack, Image, Text, VStack, useTheme } from 'native-base';

import { ImageBackground, TouchableOpacity } from 'react-native';

type AdCardProps = {
  data: ProductDTO;
};

export const AdCard = ({ data }: AdCardProps) => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function goToAdDetails() {
    navigate('adDetails');
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={goToAdDetails}
    >
      <VStack
        borderRadius={8}
        w="46%"
        mb={6}
      >
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

              <Box
                rounded="full"
                // bg="gray.2"
                py={0.5}
                px={2}
                bg={data.is_new ? 'primary.400' : 'gray.2'}
              >
                <Text color="white">{data.is_new ? 'NOVO' : 'USADO'}</Text>
              </Box>
            </HStack>
          </ImageBackground>
        </Box>

        <Text
          fontFamily="body"
          color="gray.2"
          fontSize={14}
          mt={2}
        >
          {data.name}
        </Text>

        <Text
          fontFamily="heading"
          color="gray.500"
          fontSize="xs"
          fontWeight="bold"
        >
          R${' '}
          <Text
            fontFamily="heading"
            color="gray.500"
            fontSize="md"
            fontWeight="bold"
          >
            {data.price.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </Text>
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};
