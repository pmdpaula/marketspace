/* eslint-disable indent */
import { PaymentMethodsDTO } from '@dtos/PaymentsMethodDTO';
import { HStack, Text } from 'native-base';
import {
  Bank,
  Barcode,
  CreditCard,
  IconWeight,
  Money,
  QrCode,
} from 'phosphor-react-native';

import { translatePaymentMethod } from './translatePaymentMethod';

type PaymentMethodIconProps = {
  paymentMethod: PaymentMethodsDTO;
};

export const PaymentMethodIcon = ({ paymentMethod }: PaymentMethodIconProps) => {
  const iconWeight: IconWeight = 'regular';

  const IconPM = () => {
    switch (paymentMethod) {
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
          <QrCode
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
      <IconPM />

      <Text
        fontFamily="body"
        fontWeight={600}
      >
        {translatePaymentMethod(paymentMethod)}
      </Text>
    </HStack>
  );
};
