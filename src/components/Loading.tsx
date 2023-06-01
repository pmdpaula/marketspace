import { Center, Spinner } from 'native-base';

export const Loading = ({ ...rest }) => {
  return (
    <Center
      flex={1}
      // bg="gray.1"
    >
      <Spinner {...rest} />
    </Center>
  );
};
