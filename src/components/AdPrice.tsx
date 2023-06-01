import { HStack, Text } from 'native-base';

export type AdPriceProps = {
  price: number;
  color?: 'black' | 'blue' | 'gray';
};

export const AdPrice = ({ price, color = 'blue' }: AdPriceProps) => {
  const textColor =
    color === 'blue' ? 'bluelight' : color === 'black' ? 'gray.1' : 'gray.4';

  return (
    <HStack
      alignItems="baseline"
      flex={1}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={textColor}
        mr={1}
      >
        R$
      </Text>
      <Text
        fontSize="lg"
        fontFamily="heading"
        color={textColor}
      >
        {price.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </Text>
    </HStack>
  );
};
