import {
  FormControl,
  HStack,
  IInputProps,
  Input as NBInput,
  Pressable,
  Text,
} from 'native-base';
import { Eye } from 'phosphor-react-native';

import { useState } from 'react';

type InputProps = IInputProps & {
  errorMessage?: string | null;
  mode?: 'password' | 'text';
  preText?: string;
};

export const Input = ({
  errorMessage = null,
  mode = 'text',
  isInvalid,
  preText = '',
  ...rest
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid;
  const [show, setShow] = useState(mode === 'text');

  const roundedBorderValue = 'md';

  return (
    <FormControl
      isInvalid={invalid}
      mb={4}
    >
      <HStack
        w="100%"
        h={11}
        py={0}
        // alignItems="center"
      >
        {/* {preText.length > 0 && (
          <Text
            bg="gray.7"
            h={11}
            // w="8%"
            roundedLeft={roundedBorderValue}
            fontSize={16}
            color="gray.2"
            fontFamily="body"
            textAlign={'center'}
            py={2}
            px={3}
          >
            {preText}
          </Text>
        )} */}
        <NBInput
          bg="gray.7"
          h={11}
          // w="100%"
          px={4}
          borderWidth={0}
          fontSize="md"
          color="gray.2"
          fontFamily="body"
          placeholderTextColor="gray.4"
          isInvalid={invalid}
          _invalid={{
            borderWidth: 1,
            borderColor: 'red.500',
          }}
          _focus={{
            bg: 'gray.7',
            borderWidth: 1,
            borderColor: 'gray.3',
          }}
          type={show ? 'text' : 'password'}
          InputLeftElement={
            preText.length > 0 ? (
              <Text
                bg="gray.7"
                // h={11}
                // w="8%"
                roundedLeft={roundedBorderValue}
                fontSize={16}
                color="gray.2"
                fontFamily="body"
                textAlign={'center'}
                py={2}
                px={3}
              >
                {preText}
              </Text>
            ) : undefined
          }
          InputRightElement={
            mode === 'password' ? (
              <Pressable
                onPress={() => setShow(!show)}
                mr={2}
              >
                <Eye color="#5F5B62" />
              </Pressable>
            ) : (
              <Eye
                color="#F7F7F8"
                size={1}
              />
            )
          }
          {...rest}
        />
      </HStack>

      <FormControl.ErrorMessage
        position="absolute"
        mt={0}
        mr={0}
        px={1}
        fontSize="2xs"
        borderTopRightRadius={4}
        borderBottomLeftRadius={4}
        alignSelf="flex-end"
        _text={{ color: 'white', fontSize: 'xs' }}
        bg="red.400"
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
