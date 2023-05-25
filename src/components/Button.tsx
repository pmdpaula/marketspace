/* eslint-disable indent */
import { HStack, IButtonProps, Button as NBButton, Text, useTheme } from 'native-base';
import {
  ArrowLeft,
  PencilSimpleLine,
  Plus,
  Power,
  Tag,
  TrashSimple,
  WhatsappLogo,
} from 'phosphor-react-native';

type ButtonProps = IButtonProps & {
  title: string;
  variant?: 'black' | 'blue' | 'gray';
  // ButtonIcon?: JSX.Element;
  iconName?: 'plus' | 'whatsapp' | 'left' | 'tag' | 'power' | 'trash' | 'pencil';
};

export const Button = ({
  title,
  variant = 'blue',
  // ButtonIcon,
  iconName,
  ...rest
}: ButtonProps) => {
  const { colors } = useTheme();
  // const isIconedButton = ButtonIcon ? true : false;
  // const ButtonIcon = iconName ? (

  let buttonIcon = undefined;

  switch (iconName) {
    case 'plus':
      buttonIcon = (
        <Plus
          color={variant === 'gray' ? colors.gray[700] : colors.gray[100]}
          size={16}
        />
      );
      break;

    case 'whatsapp':
      buttonIcon = (
        <WhatsappLogo
          size={16}
          color={variant === 'gray' ? colors.gray[700] : colors.gray[100]}
        />
      );
      break;

    case 'left':
      buttonIcon = (
        <ArrowLeft
          size={16}
          color={variant === 'gray' ? colors.gray[700] : colors.gray[100]}
        />
      );
      break;

    case 'tag':
      buttonIcon = (
        <Tag
          size={16}
          color={variant === 'gray' ? colors.gray[700] : colors.gray[100]}
        />
      );
      break;

    case 'power':
      buttonIcon = (
        <Power
          size={16}
          color={variant === 'gray' ? colors.gray[700] : colors.gray[100]}
        />
      );
      break;

    case 'trash':
      buttonIcon = (
        <TrashSimple
          size={16}
          color={variant === 'gray' ? colors.gray[700] : colors.gray[100]}
        />
      );
      break;

    case 'pencil':
      buttonIcon = (
        <PencilSimpleLine
          color={variant === 'gray' ? colors.gray[700] : colors.gray[200]}
          size={16}
        />
      );
      break;

    default:
      buttonIcon = undefined;
      break;
  }

  return (
    <NBButton
      bg={
        variant === 'black'
          ? colors.gray[700]
          : variant === 'gray'
          ? 'gray.5'
          : 'primary.300'
      }
      w="full"
      h={11}
      borderColor="primary.400"
      rounded="md"
      _pressed={{
        bg:
          variant === 'black'
            ? 'gray.3'
            : variant === 'gray'
            ? colors.gray[100]
            : 'primary.200',
      }}
      {...rest}
    >
      <HStack
        alignItems="center"
        justifyContent="center"
      >
        {iconName && buttonIcon}
        <Text
          fontSize="sm"
          color={variant === 'gray' ? colors.gray[700] : colors.gray[100]}
          fontFamily="body"
          fontWeight="bold"
          ml={iconName && iconName !== 'pencil' ? 2 : 0}
        >
          {title}
        </Text>
      </HStack>
    </NBButton>
  );
};
