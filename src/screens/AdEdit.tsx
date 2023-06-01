import { FullNewAdDTO, NewAdDTO, NewAdImageDTO } from '@dtos/NewAdDTO';
import { PaymentMethodsDTO } from '@dtos/PaymentsMethodDTO';
import { DatabaseProductDTO } from '@dtos/ProductDTO';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import api from '@services/api';
import { translatePaymentMethod } from '@utils/translatePaymentMethod';
import {
  Checkbox,
  FormControl,
  HStack,
  Radio,
  ScrollView,
  Switch,
  Text,
  TextArea,
  VStack,
  useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { log } from 'react-native-reanimated';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as yup from 'yup';

import { useEffect, useRef, useState } from 'react';

import { AdImageSelector } from '@components/AdImageSelector';
import { Button } from '@components/Button';
import { CheckBoxInput } from '@components/CheckBoxInput';
import { CommomHeader } from '@components/CommomHeader';
import { Input } from '@components/Input';

const newAdSchema = yup.object().shape({
  name: yup
    .string()
    .required('O nome do produto é obrigatório')
    .min(2, 'Mínimo 2 caracteres'),
  description: yup.string().required('A descrição do produto é obrigatória'),
  is_new: yup.boolean().required('É obrigatório informar se o produto é novo ou usado'),
  price: yup
    .number()
    .typeError('O valor do produto não pode ser vazio')
    .moreThan(0, 'O valor do produto deve ser maior que 0')
    .required('O preço do produto é obrigatório'),
  accept_trade: yup.boolean().required('É obrigatório informar se aceita troca'),
  payment_methods: yup
    .array()
    // .of(yup.string())
    // .min(1, 'É obrigatório informar os meios de pagamento aceitos')
    .required('É obrigatório informar os meios de pagamento aceitos'),
});

type RouteParamsProps = {
  product?: DatabaseProductDTO;
};

export const AdEdit = () => {
  const route = useRoute();
  const { product } = route.params as RouteParamsProps;

  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    PaymentMethodsDTO[]
  >(product?.payment_methods.map((method) => method.key) || []);
  const [adImages, setAdImages] = useState<NewAdImageDTO[]>(
    product?.product_images.map((image) => ({
      id: image.id,
      uri: `${api.defaults.baseURL}/images/${image.path}`,
      name: image.path,
      type: 'image/jpeg',
    })) || [],
  );

  const descriptionFieldRef = useRef<HTMLInputElement>(null);

  // console.log('🚀 ~ file: AdEdit.tsx:66 ~ AdEdit ~ product:', JSON.stringify(product));

  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewAdDTO>({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      is_new: product?.is_new,
      price: product?.price,
      accept_trade: product?.accept_trade,
      payment_methods: product?.payment_methods.map((method) => method.key),
    },
    resolver: yupResolver(newAdSchema),
  });

  const toast = useToast();

  // function handleSelectPaymentMethod(selectedMethod: PaymentMethodsDTO) {
  //   if (selectedPaymentMethods.includes(selectedMethod)) {
  //     setSelectedPaymentMethods(
  //       selectedPaymentMethods.filter((method) => method !== selectedMethod),
  //     );
  //   } else {
  //     setSelectedPaymentMethods([...selectedPaymentMethods, selectedMethod]);
  //   }
  // }

  function handleEditAdForm(data: NewAdDTO) {
    if (selectedPaymentMethods.length === 0) {
      toast.show({
        title: 'É obrigatório informar ao menos um meio de pagamento',
        placement: 'top',
        bgColor: 'red.400',
        duration: 4000,
      });
    }

    // const convertedPrice = Number(data.price.replace(',', '.'));

    const editedAdData = {
      ...data,
      price: Number(data.price),
      payment_methods: selectedPaymentMethods,
    };

    return editedAdData;

    // console.log('🚀 ~ file: NewAd.tsx:91 ~ handleNewAdForm ~ newAdData:', newAdData);
    // navigate('previewNewAd', { fullNewAd: newAdData });
  }

  function unionAdDataWithImages(adData: NewAdDTO): FullNewAdDTO {
    const adDataWithImages = {
      newAd: adData,
      newAdImages: adImages,
    };

    return adDataWithImages;
  }

  function handleNavigateToPreviewNewAd(data: NewAdDTO) {
    const newAdData = handleEditAdForm(data);
    const newAdDataWithImages = unionAdDataWithImages(newAdData);

    // console.log(
    //   '🚀 ~ file: NewAd.tsx:142 ~ handleNavigateToPreviewNewAd ~ newAdDataWithImages:',
    //   newAdDataWithImages,
    // );

    navigate('adPreview', { fullAdData: newAdDataWithImages });
  }

  useEffect(() => {
    // if (defaultValues.payment_methods > 0) {}
    // console.log(product?.payment_methods.map((method) => method.key));
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack
          px={6}
          mb={16}
        >
          <CommomHeader
            title="Editar anúncio"
            showBackButton
          />

          <VStack mt={6}>
            <Text
              fontFamily="body"
              fontSize="md"
              fontWeight="bold"
              color="gray.2"
              mb={1}
            >
              Imagens
            </Text>

            <Text
              fontFamily="body"
              fontSize="sm"
              color="gray.2"
              mb={2}
            >
              Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
            </Text>

            {/* <IconButton
              icon={
                <Icon
                  as={AntDesign}
                  name="plus"
                />
              }
              h={100}
              w={100}
              color="gray.4"
              bg="gray.5"
              rounded="md"
              mb={6}
            /> */}
            <AdImageSelector
              adImages={adImages}
              setAdImages={setAdImages}
            />

            <Text
              fontFamily="body"
              fontSize="md"
              fontWeight="bold"
              color="gray.2"
              mb={1}
            >
              Sobre o produto
            </Text>

            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Título do anúncio"
                  isRequired
                  returnKeyType="next"
                  onSubmitEditing={() => descriptionFieldRef.current?.focus()}
                  errorMessage={errors.name?.message}
                  w="100%"
                />
              )}
            />

            <FormControl isInvalid>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextArea
                    value={value}
                    onChangeText={onChange}
                    placeholder="Descrição do produto"
                    isRequired
                    ref={descriptionFieldRef}
                    totalLines={6}
                    h={160}
                    autoCompleteType="off"
                    bg="gray.7"
                    borderWidth={0}
                    fontSize="md"
                    color="gray.2"
                    fontFamily="body"
                    rounded="md"
                    placeholderTextColor="gray.4"
                    isInvalid={!!errors.description}
                    _invalid={{
                      borderWidth: 1,
                      borderColor: 'red.500',
                    }}
                    _focus={{
                      bg: 'gray.7',
                      borderWidth: 1,
                      borderColor: 'gray.3',
                    }}
                    mb={3}
                  />
                )}
              />
              <FormControl.ErrorMessage
                position="absolute"
                mt={0}
                mr={0.5}
                px={1}
                fontSize="2xs"
                borderTopRightRadius={4}
                borderBottomLeftRadius={4}
                alignSelf="flex-end"
                bg="red.400"
                _text={{ color: 'white', fontSize: 'xs' }}
              >
                {errors.description?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <Controller
              name="is_new"
              control={control}
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Radio.Group
                  name="is_new"
                  value={value ? 'new' : 'used'}
                  onChange={(val) => onChange(val === 'new')}
                  flexDirection="row"
                >
                  <HStack
                    space={12}
                    w="100%"
                  >
                    <Radio
                      value="new"
                      my={1}
                    >
                      Produto novo
                    </Radio>
                    <Radio
                      value="used"
                      my={1}
                    >
                      Produto usado
                    </Radio>
                  </HStack>
                </Radio.Group>
              )}
            />

            <Text
              fontFamily="body"
              fontSize="md"
              fontWeight="bold"
              color="gray.2"
              mb={1}
              mt={3}
            >
              Venda
            </Text>

            <Controller
              name="price"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={String(value)}
                  onChangeText={onChange}
                  placeholder="Valor do produto"
                  isRequired
                  // ref={priceFieldRef}
                  w="100%"
                  mb={6}
                  errorMessage={errors.price?.message}
                  keyboardType="numeric"
                  preText="R$"
                />
              )}
            />

            <Text
              fontFamily="body"
              fontSize="md"
              fontWeight="bold"
              color="gray.2"
            >
              Aceita troca?
            </Text>

            <Controller
              name="accept_trade"
              control={control}
              render={({ field: { onChange, value } }) => (
                <HStack
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Switch
                    value={value}
                    onToggle={(val: boolean) => onChange(val)}
                    size="lg"
                    isChecked={value}
                    offTrackColor="gray.5"
                    onTrackColor="bluelight"
                    mb={3}
                  />

                  <Text
                    fontFamily="body"
                    fontSize="md"
                    ml={3}
                    mt={-2}
                  >
                    {value ? 'sim' : 'não'}
                  </Text>
                </HStack>
              )}
            />

            <Text
              fontFamily="body"
              fontSize="md"
              fontWeight="bold"
              color="gray.2"
              mb={1}
            >
              Meios de pagamentos aceitos
            </Text>

            <FormControl isInvalid>
              <Controller
                name="payment_methods"
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <Checkbox.Group onChange={(val) => onChange(val)}>
                      <CheckBoxInput
                        label={translatePaymentMethod('boleto')}
                        value="boleto"
                        selectedPaymentMethods={selectedPaymentMethods}
                        setSelectedPaymentMethods={setSelectedPaymentMethods}
                      />

                      <CheckBoxInput
                        label={translatePaymentMethod('pix')}
                        value="pix"
                        selectedPaymentMethods={selectedPaymentMethods}
                        setSelectedPaymentMethods={setSelectedPaymentMethods}
                      />

                      <CheckBoxInput
                        label={translatePaymentMethod('cash')}
                        value="cash"
                        selectedPaymentMethods={selectedPaymentMethods}
                        setSelectedPaymentMethods={setSelectedPaymentMethods}
                      />

                      <CheckBoxInput
                        label={translatePaymentMethod('card')}
                        value="card"
                        selectedPaymentMethods={selectedPaymentMethods}
                        setSelectedPaymentMethods={setSelectedPaymentMethods}
                      />

                      <CheckBoxInput
                        label={translatePaymentMethod('deposit')}
                        value="deposit"
                        selectedPaymentMethods={selectedPaymentMethods}
                        setSelectedPaymentMethods={setSelectedPaymentMethods}
                      />
                    </Checkbox.Group>
                  );
                }}
              />
              <FormControl.ErrorMessage
                position="absolute"
                mt={0}
                mr={0.5}
                px={1}
                fontSize="sm"
                borderTopRightRadius={4}
                borderBottomLeftRadius={4}
                alignSelf="flex-end"
                _text={{ color: 'white', fontSize: 'xs' }}
                bg="red.400"
              >
                {errors.payment_methods?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack
        bg="gray.100"
        justifyContent="space-between"
        alignItems="center"
        px={6}
        py={5}
      >
        <Button
          title="Cancelar"
          variant="gray"
          w="48%"
          onPress={goBack}
        />
        <Button
          title="Avançar"
          variant="black"
          w="48%"
          onPress={handleSubmit(handleNavigateToPreviewNewAd)}
          isDisabled={!isValid}
        />
      </HStack>
    </>
  );
};
