import { ProductDTO } from '@dtos/ProductDTO';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Divider,
  FlatList,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import { ArrowRight, MagnifyingGlass, Sliders, Tag } from 'phosphor-react-native';

import { AdCard } from '@components/AdCard';
import { Button } from '@components/Button';

const products: ProductDTO[] = [
  {
    id: '46df47e7-d7b3-47e5-8870-7d5068105c20',
    name: 'Luminária Pendente',
    description: 'Essa é a melhor luminária do mundo. Você não vai se arrepender',
    is_new: true,
    price: 450,
    accept_trade: true,
    user_id: 'd20c858a-849c-4d0f-8082-00e93b20dd0c',
    is_active: true,
    created_at: '2022-11-14T23:54:58.968Z',
    updated_at: '2022-11-14T23:54:58.968Z',
  },
  {
    id: '35af42c3-80e8-4c68-998d-144b942e7e8a',
    name: 'Cadeira de Escritório',
    description:
      'A cadeira mais confortável para passar horas trabalhando sem sentir dor nas costas',
    is_new: false,
    price: 149.9,
    accept_trade: false,
    user_id: '21f9f4c4-4ab4-4da4-b7ee-cd14c4f30335',
    is_active: true,
    created_at: '2022-10-02T18:23:15.342Z',
    updated_at: '2022-10-02T18:23:15.342Z',
  },
  {
    id: 'b84e0d98-62b6-4b7a-9d36-2b4e96469f0a',
    name: 'Fone de Ouvido Bluetooth',
    description: 'O melhor som de qualidade em um fone de ouvido sem fio',
    is_new: true,
    price: 899.0,
    accept_trade: true,
    user_id: 'e2bfb4f2-4a4e-4c1b-a7e4-4c7198b93ccf',
    is_active: true,
    created_at: '2022-12-05T11:11:21.777Z',
    updated_at: '2022-12-05T11:11:21.777Z',
  },
  {
    id: '87c8fc79-0fc6-4440-9d71-3998d92dc9e6',
    name: 'Panela de Pressão Elétrica',
    description:
      'Cozinhe mais rápido e de forma fácil com essa panela de pressão elétrica',
    is_new: false,
    price: 289.9,
    accept_trade: false,
    user_id: 'f1767a87-b365-4c7f-bcf4-3e19450b3d5a',
    is_active: true,
    created_at: '2022-09-19T07:44:03.456Z',
    updated_at: '2022-09-19T07:44:03.456Z',
  },
  {
    id: 'fbf6da1e-9f15-44a8-9500-909f11b6f1c6',
    name: 'Notebook Gamer',
    description: 'O notebook mais poderoso para jogar seus jogos favoritos',
    is_new: true,
    price: 7999.0,
    accept_trade: true,
    user_id: 'c21a1d22-9292-4c0a-8e8a-34fc07d12188',
    is_active: true,
    created_at: '2023-01-30T14:07:01.321Z',
    updated_at: '2023-01-30T14:07:01.321Z',
  },
];

export const Home = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function goToNewAd() {
    navigate('newAd');
  }

  return (
    <VStack
      flex={1}
      px={6}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack py={20}>
          {/* Header */}
          <HStack
            justifyContent="space-between"
            mb={6}
          >
            <Image
              source={{ uri: 'https://github.com/pmdpaula.png' }}
              alt="imagem do usuário"
              size={12}
              rounded="full"
              borderWidth={2}
              borderColor="primary.400"
              mr={2}
            />

            <VStack flex={1}>
              <Text fontFamily="body">Boas vindas,</Text>
              <Text
                fontFamily="heading"
                bold
              >
                Pedro
              </Text>
            </VStack>

            <Button
              title="Criar Anúncio"
              onPress={goToNewAd}
              w="auto"
              variant="black"
              // ButtonIcon={<Plus />}
              iconName="plus"
            >
              Criar anúncio
            </Button>
          </HStack>

          <Text
            fontFamily="body"
            fontSize="sm"
          >
            Seus produtos anunciados para venda
          </Text>

          {/* light blue box */}
          <HStack
            mt={2}
            bg={'rgba(100, 122, 199, 0.1)'}
            rounded="md"
            w="100%"
            alignItems="center"
            py={3}
            px={4}
          >
            <Tag color={colors.primary[400]} />

            <VStack
              ml={4}
              flex={1}
            >
              <Text
                fontFamily="body"
                fontWeight="bold"
                fontSize="lg"
              >
                4
              </Text>

              <Text fontSize="xs">Anúncios ativos</Text>
            </VStack>

            <HStack alignItems="center">
              <Text
                fontSize="xs"
                fontWeight="bold"
                mr={2}
                color={colors.primary[400]}
              >
                Meus anúncios
              </Text>
              <ArrowRight color={colors.primary[400]} />
            </HStack>
          </HStack>

          <Text
            fontFamily="body"
            fontSize="sm"
            mt={8}
          >
            Compre produtos variados
          </Text>

          <Input
            bg="gray.7"
            h={14}
            p={4}
            borderWidth={0}
            fontSize="md"
            color="gray.2"
            fontFamily="body"
            mb={1}
            rounded="md"
            placeholder="Buscar anúncio"
            placeholderTextColor="gray.4"
            _invalid={{
              borderWidth: 1,
              borderColor: 'red.500',
            }}
            _focus={{
              bg: 'gray.7',
              borderWidth: 1,
              borderColor: 'gray.3',
            }}
            InputRightElement={
              <>
                <Pressable>
                  <MagnifyingGlass
                    color="#5F5B62"
                    weight="bold"
                  />
                </Pressable>

                <Divider
                  orientation="vertical"
                  h={8}
                  mx={3}
                  color="gray.4"
                />

                <Pressable mr={2}>
                  <Sliders
                    color="#5F5B62"
                    weight="bold"
                  />
                </Pressable>
              </>
            }
          />
        </VStack>
      </ScrollView>
      <FlatList
        data={products}
        renderItem={({ item }) => <AdCard data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
};
