import { NewAdImageDTO } from '@dtos/NewAdDTO';
import { Box, Image } from 'native-base';

type ImageBoxProps = {
  imageData: NewAdImageDTO;
};

export const ImageBox = ({ imageData, ...rest }: ImageBoxProps) => {
  return (
    <Box
      key={imageData.id}
      shadow={4}
      bg="gray.100"
      rounded="2xl"
      mx={3}
      w={240}
      h="98%"
      overflow="hidden"
      {...rest}
    >
      <Image
        resizeMode="cover"
        h="100%"
        w="100%"
        source={{ uri: imageData.uri }}
        alt={imageData.name}
      />
    </Box>
  );
};
