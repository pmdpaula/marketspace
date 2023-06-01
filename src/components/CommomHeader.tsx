import { DatabaseProductDTO } from '@dtos/ProductDTO';
import { AntDesign } from '@expo/vector-icons';
import { useAd } from '@hooks/useAd';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Box, HStack, Icon, IconButton, Text } from 'native-base';
// eslint-disable-next-line import/no-unresolved
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';

type CommomHeaderProps = IHStackProps & {
  title?: string | null;
  showBackButton?: boolean;
  rigthOption?: 'plus' | 'edit' | null;
};

export const CommomHeader = ({
  title = null,
  showBackButton = true,
  rigthOption = null,
  ...rest
}: CommomHeaderProps) => {
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { adSelected, setAdSelected } = useAd();

  function handleRightLink() {
    if (rigthOption === 'plus') {
      navigate('adNew');
    }

    if (rigthOption === 'edit') {
      navigate('adEdit', { product: adSelected });
    }
  }

  function handleBackButton() {
    if (title?.includes('Criar') || !title) {
      setAdSelected({} as DatabaseProductDTO);
    }

    goBack();
  }

  return (
    <HStack
      mt={20}
      h={6}
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      py={1}
      {...rest}
    >
      {showBackButton ? (
        <IconButton
          icon={
            <Icon
              as={AntDesign}
              name="arrowleft"
            />
          }
          color="gray.1"
          onPress={handleBackButton}
          size="lg"
          p={0}
          w="15%"
          justifyContent={'flex-start'}
        />
      ) : (
        <Box
          w="15%"
          h={6}
        />
      )}
      <Box
        w="70%"
        h={7}
        textAlign="center"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontFamily="heading"
          fontSize="lg"
          color="gray.1"
        >
          {title}
        </Text>
      </Box>

      {rigthOption ? (
        <IconButton
          icon={
            <Icon
              as={AntDesign}
              name={rigthOption}
            />
          }
          color="gray.1"
          onPress={handleRightLink}
          size="lg"
          p={0}
          w="15%"
          justifyContent={'flex-end'}
        />
      ) : (
        <Box
          w="15%"
          h={6}
        >
          {' '}
        </Box>
      )}
    </HStack>
  );
};
