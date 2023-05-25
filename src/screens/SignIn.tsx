import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { AppError } from '@utils/AppError';
import { Heading, Image, ScrollView, Text, VStack, useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useEffect, useState } from 'react';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import LogoImg from '@assets/logo.png';

const signInSchema = yup
  .object({
    email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
    password: yup.string().required('Informe a senha').min(4, 'Mínimo 4 caracteres'),
  })
  .required();

type FormDataProps = yup.InferType<typeof signInSchema>;

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: FormDataProps) {
    setIsLoading(true);

    try {
      await signIn(email, password);
      // Não setamos o isLoading para false quando a requisição dá certo, pq ao fazer isto,
      // podemos receber um erro de que o componente já foi desmontado.
      // O ideal é que o isLoading seja setado para false no useEffect do componente
    } catch (error) {
      console.log('🚀 ~ file: SignIn.tsx:50 ~ handleSignIn ~ error:', error);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Erro ao fazer login. Tente novamente mais tarde.';

      toast.show({
        title,
        duration: 5000,
        placement: 'top',
        bg: 'red.500',
      });
    }
  }

  function goToSignUp() {
    navigate('signUp');
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        bg="gray.7"
        pb={12}
      >
        <VStack
          alignItems="center"
          justifyContent="center"
          // h={560}
          bg="gray.6"
          py={24}
          px={12}
          roundedBottomLeft={16}
          roundedBottomRight={16}
        >
          <Image
            source={LogoImg}
            alt="logotipo"
          />
          <Heading
            fontFamily="heading"
            size="xl"
            color="gray.1"
          >
            marketspace
          </Heading>
          <Text>Seu espaço de compra e venda</Text>

          <Text
            mt={20}
            mb={4}
          >
            Acesse sua conta
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="E-mail"
                isRequired
                w="100%"
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Senha"
                isRequired
                w="100%"
                mode="password"
                secureTextEntry
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Entrar"
            mt={4}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </VStack>
        <VStack
          alignItems="center"
          px={12}
        >
          <Text
            mt="56px"
            mb={4}
          >
            Anda não tem acesso?
          </Text>

          <Button
            title="Criar uma conta"
            onPress={goToSignUp}
            variant="gray"
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
};
