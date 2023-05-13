import { Heading, ScrollView, VStack } from 'native-base';

export const NewAd = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack>
        <Heading>NewAd</Heading>
      </VStack>
    </ScrollView>
  );
};
