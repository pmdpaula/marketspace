import { FormControl, IInputProps, Input as NBInput, Pressable } from 'native-base';
import { Eye } from 'phosphor-react-native';

import { useEffect, useState } from 'react';

type InputProps = IInputProps & {
  errorMessage?: string | null;
  mode?: 'password' | 'text';
};

export const Input = ({
  errorMessage = null,
  mode = 'text',
  isInvalid,
  ...rest
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid;
  const [show, setShow] = useState(mode === 'text');

  return (
    <FormControl
      isInvalid={invalid}
      mb={4}
    >
      <NBInput
        bg="gray.7"
        h={11}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="gray.2"
        fontFamily="body"
        rounded="md"
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

      <FormControl.ErrorMessage
        position="absolute"
        mt={0}
        mr={0.5}
        // py={0.5}
        px={1}
        fontSize="2xs"
        // borderTopLeftRadius={4}
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
