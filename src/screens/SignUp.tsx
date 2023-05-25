import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import {
  Box,
  Center,
  Heading,
  Input as NBInput,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
} from 'native-base';
import { PencilSimpleLine } from 'phosphor-react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useEffect, useState } from 'react';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { UserPhoto } from '@components/UserPhoto';

import AvatarImg from '@assets/avatar.png';
import LogoSvg from '@assets/logo.svg';

const signUpSchema = yup
  .object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().email().required('Informe o e-mail').email('E-mail inválido'),
    tel: yup.string().required('Informe o telefone'),
    password: yup.string().required('Informe a senha').min(6, 'Mínimo 6 caracteres'),
    passwordConfirm: yup
      .string()
      .required('Confirme a senha')
      .oneOf([yup.ref('password')], 'As senhas não coincidem'),
    avatar: yup.string(),
  })
  .required();

type FormDataProps = yup.InferType<typeof signUpSchema>;

const PHOTO_SIZE = 24;

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userPhoto, setUserPhoto] = useState<any>(AvatarImg);
  const [userPhotoName, setUserPhotoName] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const { goBack } = useNavigation();
  const { colors } = useTheme();

  const toast = useToast();

  async function handleSignUp({ name, email, tel, password }: FormDataProps) {
    setIsLoading(true);

    const userForm = new FormData();
    userForm.append('name', name);
    userForm.append('email', email);
    userForm.append('tel', tel);
    userForm.append('password', password);
    userForm.append('avatar', userPhoto);

    try {
      await api.post(
        '/users/',
        userForm,
        // { name, email, tel, password },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      toast.show({
        title: 'Usuário criado com sucesso!',
        placement: 'top',
        duration: 3000,
        bgColor: 'green.500',
      });

      setTimeout(() => {
        goBack();
      }, 3000);
    } catch (error) {
      console.log('🚀 ~ file: SignUp.tsx:76 ~ handleSignUp ~ error:', error);
      setIsLoading(false);

      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível criar a conta agora.';

      toast.show({
        title,
        duration: 5000,
        placement: 'top',
        bg: 'red.500',
      });
    }
  }

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [1, 1],
        allowsEditing: true,
        selectionLimit: 1,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri, {
          size: true,
        });

        if (photoInfo.exists && photoInfo.size > 1024 * 1024 * 3) {
          return toast.show({
            title: 'A imagem deve ter no máximo 3MB',
            placement: 'top',
            duration: 3000,
            bgColor: 'red.500',
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        const photoFile = {
          name: `${userPhotoName}.${fileExtension}`
            .toLocaleLowerCase()
            .replace(/\s/g, ''),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
        console.log(
          '🚀 ~ file: SignUp.tsx:162 ~ handleUserPhotoSelect ~ photoFile:',
          photoFile,
        );

        setUserPhoto(photoFile);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('userPhoto.uri: ', userPhoto);
  }, [userPhoto]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        bg="gray.6"
        py={20}
        px={12}
        alignItems="center"
      >
        <LogoSvg />
        <Heading
          fontFamily="heading"
          size="lg"
          color="gray.1"
          mt={4}
          mb={2}
        >
          Boas vindas!
        </Heading>
        <Text
          fontFamily="body"
          textAlign="center"
          color="gray.2"
        >
          Crie sua conta e use o espaço para comprar{'\n'}itens variados e vender seus
          produtos
        </Text>

        <VStack
          w="100%"
          mt={8}
        >
          <Center mb={4}>
            <UserPhoto
              source={userPhoto}
              alt="foto do usuário"
              size={PHOTO_SIZE}
            />
            <Controller
              control={control}
              name="avatar"
              render={({ field: { value } }) => (
                <Pressable
                  onPress={handleUserPhotoSelect}
                  position="absolute"
                  bottom={0}
                  right={24}
                  isDisabled={!userPhotoName}
                >
                  <NBInput
                    value={value}
                    isDisabled={!userPhotoName}
                    rounded="full"
                    maxW={10}
                    maxH={10}
                    bgColor="primary.300"
                    borderWidth={0}
                    InputLeftElement={
                      <Box ml={2}>
                        <PencilSimpleLine
                          color={colors.gray[100]}
                          size={24}
                        />
                      </Box>
                    }
                  />
                </Pressable>
              )}
            />
          </Center>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Nome"
                isRequired
                w="100%"
                errorMessage={errors.name?.message}
                onTextInput={() => setUserPhotoName(value)}
              />
            )}
          />

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
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Telefone"
                isRequired
                w="100%"
                errorMessage={errors.tel?.message}
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
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Confirmar senha"
                isRequired
                w="100%"
                mode="password"
                errorMessage={errors.passwordConfirm?.message}
              />
            )}
          />

          <Button
            title="Criar"
            mt={1}
            variant="black"
            isLoading={isLoading}
            onPress={handleSubmit(handleSignUp)}
          />
        </VStack>

        <Text
          mt="56px"
          mb={4}
        >
          Já tem uma conta?
        </Text>

        <Button
          title="Ir para o login"
          variant="gray"
          onPress={goBack}
        />
      </VStack>
    </ScrollView>
  );
};
