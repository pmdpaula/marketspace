import { Heading, ScrollView, VStack } from 'native-base';

export const AdDetails = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack>
        <Heading>AdDetails</Heading>
      </VStack>
    </ScrollView>
  );
};
