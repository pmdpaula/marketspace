import { Heading, ScrollView, VStack } from 'native-base';

export const MyAds = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack>
        <Heading>MyAds</Heading>
      </VStack>
    </ScrollView>
  );
};
