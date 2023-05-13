import { Heading, ScrollView, VStack } from 'native-base';

export const PreAd = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack>
        <Heading>PreAd</Heading>
      </VStack>
    </ScrollView>
  );
};
