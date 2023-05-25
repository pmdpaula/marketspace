import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, IconButton, Text } from 'native-base';

import { Pressable, TouchableOpacity } from 'react-native';

type CommomHeaderProps = {
  title?: string | null;
  showBackButton?: boolean;
  rigthOption?: 'plus' | 'edit' | null;
};

export const CommomHeader = ({
  title = null,
  showBackButton = true,
  rigthOption = null,
}: CommomHeaderProps) => {
  const { goBack } = useNavigation();

  return (
    <HStack
      mt={20}
      h={6}
      justifyContent="space-between"
      alignItems="center"
      // space={3}
      mb={2}
      // px={4}
      py={1}
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
          onPress={goBack}
          size="lg"
          // bg="cyan.600"
          p={0}
          w="15%"
          justifyContent={'flex-start'}
        />
      ) : (
        <Box
          w="15%"
          h={6}
          // bg="cyan.600"
        />
      )}
      <Box
        w="70%"
        h={7}
        textAlign="center"
        // bg="cyan.200"
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
          // onPress={goBack}
          size="lg"
          // bg="cyan.600"
          p={0}
          w="15%"
          justifyContent={'flex-end'}
        />
      ) : (
        <Box
          w="15%"
          h={6}
          // bg="cyan.600"
        >
          {' '}
        </Box>
      )}
    </HStack>
  );
};
