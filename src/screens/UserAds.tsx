import { ProductDTO } from '@dtos/ProductDTO';
import { useAuth } from '@hooks/useAuth';
import { useRoute } from '@react-navigation/native';
import { translateFilterActive } from '@utils/translateFilterActive';
import {
  CheckIcon,
  HStack,
  ScrollView,
  Select,
  Spinner,
  Text,
  VStack,
} from 'native-base';

import { useEffect, useState } from 'react';

import { AdCard } from '@components/AdCard';
import { CommomHeader } from '@components/CommomHeader';

// type RouteParamsProps = {
//   userAds: ProductDTO[];
// };
type FilterActiveProps = 'all' | 'active' | 'inactive';

export const UserAds = () => {
  const { userAds, isLoadingUserAds } = useAuth();

  const [filterActive, setFilterActive] = useState<string>('all');
  const [adsFiltered, setAdsFiltered] = useState<ProductDTO[]>(userAds);

  function handleFilteredAds(filter: string) {
    if (filterActive === 'all') {
      setAdsFiltered(userAds);
    } else {
      const filtered = userAds.filter(
        (ad) => ad.is_active === (filterActive === 'active'),
      );
      setFilterActive(filter);
      setAdsFiltered(filtered);
    }
  }

  useEffect(() => {
    console.log('🚀 ~ file: UserAds.tsx:28 ~ filterActive:', filterActive);
    // getMyAdsData();
  }, [filterActive]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        px={6}
        mb={16}
        flex={1}
      >
        <CommomHeader
          title="Meus anúncios"
          rigthOption="plus"
        />

        {isLoadingUserAds ? (
          <VStack
            // flex={1}
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner
              size={48}
              color="bluelight"
            />
          </VStack>
        ) : (
          <>
            <HStack
              mt={4}
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              mb={6}
            >
              <Text>{userAds.length} anúncios</Text>

              <Select
                selectedValue={filterActive}
                minWidth={100}
                accessibilityLabel="Filtre por status"
                placeholder="Filtre por status"
                _item={{
                  p: 2,
                  fontFamily: 'body',
                  fontSize: 24,
                }}
                fontSize="md"
                _selectedItem={{
                  bg: 'bluelight',
                  color: 'gray.6',
                  borderRadius: 'md',
                  fontWeight: 600,
                  endIcon: (
                    <CheckIcon
                      size={4}
                      color="gray.6"
                    />
                  ),
                }}
                mt={1}
                onValueChange={(itemValue) => handleFilteredAds(itemValue)}
              >
                {['all', 'active', 'inactive'].map((item) => (
                  <Select.Item
                    key={item}
                    label={translateFilterActive(item)}
                    value={item}
                  />
                ))}
              </Select>
            </HStack>

            <HStack
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {adsFiltered.map((ad) => {
                return (
                  <AdCard
                    key={ad.id}
                    data={ad}
                  />
                );
              })}
            </HStack>
          </>
        )}
      </VStack>
    </ScrollView>
  );
};
