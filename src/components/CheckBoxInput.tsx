import { PaymentMethodsDTO } from '@dtos/PaymentsMethodDTO';
import { Feather } from '@expo/vector-icons';
import { Box, Center, HStack, IPressableProps, Icon, Pressable, Text } from 'native-base';

import { useEffect, useState } from 'react';

// import { PaymentMethods } from "@dtos/AddsDTO";

type Props = IPressableProps & {
  value: PaymentMethodsDTO;
  label: string;
  selectedPaymentMethods: PaymentMethodsDTO[];
  setSelectedPaymentMethods: (value: PaymentMethodsDTO[]) => void;
};

export const CheckBoxInput = ({
  value,
  label,
  selectedPaymentMethods,
  setSelectedPaymentMethods,
  ...rest
}: Props) => {
  const [isSelected, setIsSelected] = useState(selectedPaymentMethods.includes(value));

  const updatePaymentMethods = () => {
    if (!isSelected) {
      setSelectedPaymentMethods([...selectedPaymentMethods, value]);
    } else {
      const removedOption = selectedPaymentMethods.filter((option) => option !== value);
      setSelectedPaymentMethods(removedOption);
    }
  };

  const changeBoxSelectedState = () => {
    setIsSelected(!isSelected);
  };

  const handleChangePaymentMethods = () => {
    updatePaymentMethods();
    changeBoxSelectedState();
  };

  useEffect(() => {
    if (selectedPaymentMethods.length === 0) {
      setIsSelected(false);
    }
  });

  return (
    <Pressable
      alignSelf="flex-start"
      onPress={handleChangePaymentMethods}
      {...rest}
    >
      <HStack
        alignItems="center"
        mb={1}
      >
        <Box
          w={5}
          h={5}
          rounded="sm"
          borderWidth={isSelected ? 0 : 2}
          borderColor="gray.4"
          bgColor={isSelected ? 'bluelight' : 'gray.6'}
        >
          {isSelected && (
            <Center flex={1}>
              <Icon
                as={Feather}
                size={3}
                name="check"
                color="gray.7"
              />
            </Center>
          )}
        </Box>

        <Text
          fontSize="md"
          fontFamily="body"
          color="gray.2"
          ml={3}
        >
          {label}
        </Text>
      </HStack>
    </Pressable>
  );
};
