/* eslint-disable indent */
import { DatabasePaymentMethodsDTO } from '@dtos/ProductDTO';
import { HStack, Text } from 'native-base';
import {
  Bank,
  Barcode,
  CreditCard,
  IconWeight,
  Money,
  QrCode,
} from 'phosphor-react-native';

type PaymentMethodIconProps = {
  paymentMethod: DatabasePaymentMethodsDTO;
};

export const PaymentMethodIcon = ({ paymentMethod }: PaymentMethodIconProps) => {
  const iconWeight: IconWeight = 'regular';

  const IconPM = () => {
    switch (paymentMethod.key) {
      case 'card':
        return (
          <CreditCard
            size={20}
            weight={iconWeight}
          />
        );
      case 'boleto':
        return (
          <Barcode
            size={20}
            weight={iconWeight}
          />
        );
      case 'cash':
        return (
          <Money
            size={20}
            weight={iconWeight}
          />
        );
      case 'deposit':
        return (
          <Bank
            size={20}
            weight={iconWeight}
          />
        );
      case 'pix':
        return (
          <QrCode
            size={20}
            weight={iconWeight}
          />
        );
      default:
        return (
          <Money
            size={20}
            weight={iconWeight}
          />
        );
    }
  };

  return (
    <HStack
      h={6}
      space={3}
    >
      {!!paymentMethod.key && (
        <>
          <IconPM />

          <Text
            fontFamily="body"
            fontWeight={600}
          >
            {paymentMethod.name}
          </Text>
        </>
      )}
    </HStack>
  );
};
