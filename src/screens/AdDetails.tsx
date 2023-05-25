import { ProductDTO } from '@dtos/ProductDTO';
import { useRoute } from '@react-navigation/native';
import { PaymentMethodIcon } from '@utils/PaymentMethodIcon';
import { translatePaymentMethod } from '@utils/translatePaymentMethod';
import { translateProductCondition } from '@utils/translateProductCondition';
import {
  Avatar,
  Badge,
  Box,
  Container,
  HStack,
  Heading,
  Image,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';

import { CommomHeader } from '@components/CommomHeader';

type RouteParamsProps = {
  product: ProductDTO;
};

export const AdDetails = () => {
  const route = useRoute();

  const { product } = route.params as RouteParamsProps;

  console.log('🚀 ~ file: AdDetails.tsx:18 ~ AdDetails ~ product:', product);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack>
        <CommomHeader showBackButton />

        {/* <Image source={{ uri: product. }} alt="product" /> */}
        <Skeleton
          h="280"
          w="100%"
          startColor="primary.400"
          fadeDuration={0.2}
        />

        <VStack
          px={4}
          mt={5}
          space={3}
        >
          <HStack
            justifyContent={'flex-start'}
            alignItems={'center'}
          >
            <Avatar
              source={{ uri: 'http://github.com/pmdpaula.png' }}
              size="sm"
              bg="primary.400"
              mr={3}
            />

            <Text fontFamily="body">Pedro</Text>
          </HStack>

          <Badge
            bg="gray.5"
            rounded="full"
            maxWidth={100}
          >
            <Text
              fontFamily="body"
              fontWeight="600"
              color="gray.2"
            >
              {translateProductCondition(product.is_new)}
            </Text>
          </Badge>

          <HStack
            justifyContent={'space-evenly'}
            flexWrap={'nowrap'}
            h={26}
          >
            <Text
              fontFamily="heading"
              size="lg"
              w="75%"
            >
              {product.name}
            </Text>

            <Text
              color="bluelight"
              size="2xl"
              fontFamily="heading"
              w="25%"
              textAlign={'right'}
            >
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                currencyDisplay: 'symbol',
              })}
            </Text>
          </HStack>

          <Text>{product.description}</Text>

          <HStack
            space={3}
            h={26}
            mb={2}
          >
            <Text fontFamily="heading">Aceita troca?</Text>
            <Text fontFamily="body">{product.accept_trade ? 'Sim' : 'Não'}</Text>
          </HStack>

          <VStack>
            <Text
              fontFamily="heading"
              mb={3}
            >
              Meio de Pagamento:
            </Text>

            {product.payment_methods.map((paymentMethod) => (
              <PaymentMethodIcon
                key={paymentMethod}
                paymentMethod={paymentMethod}
              />
            ))}
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
