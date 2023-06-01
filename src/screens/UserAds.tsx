import { DatabaseProductDTO } from '@dtos/ProductDTO';
import { useAd } from '@hooks/useAd';
import { useFocusEffect } from '@react-navigation/native';
import { translateFilterActive } from '@utils/translateFilterActive';
import { CheckIcon, HStack, ScrollView, Select, Text, VStack } from 'native-base';

import { useCallback, useEffect, useState } from 'react';

import { AdCard } from '@components/AdCard';
import { CommomHeader } from '@components/CommomHeader';
import { Loading } from '@components/Loading';

export const UserAds = () => {
  const { userAds, isLoadingUserAds, fetchUserAdsData } = useAd();

  const [filterValue, setFilterValue] = useState<string>('all');

  const [adsFiltered, setAdsFiltered] = useState<DatabaseProductDTO[]>(userAds);
  const [isFilteringAds, setIsFilteringAds] = useState<boolean>(false);

  function handleFilteredAds(filter: string) {
    setIsFilteringAds(true);
    setFilterValue(filter);

    if (filter === 'all') {
      setAdsFiltered(userAds);
    } else {
      const filteredAds = userAds.filter((ad) => ad.is_active === (filter === 'active'));

      setAdsFiltered(filteredAds);
    }

    setIsFilteringAds(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserAdsData();
    }, []),
  );

  useEffect(() => {
    fetchUserAdsData();
  }, []);

  useEffect(() => {
    setAdsFiltered(userAds);
  }, [userAds]);

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
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Loading
              size="lg"
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
                selectedValue={filterValue}
                minWidth={140}
                accessibilityLabel="Filtre por status"
                placeholder="Filtre por status"
                _item={{
                  p: 2,
                  fontFamily: 'body',
                  fontSize: 24,
                  marginBottom: 3,
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

            {isFilteringAds ? (
              <Loading />
            ) : (
              <HStack
                flexWrap="wrap"
                justifyContent="space-between"
              >
                {adsFiltered.length > 0 &&
                  adsFiltered.map((ad) => {
                    return (
                      <AdCard
                        key={ad.id}
                        data={ad}
                        priceColor={ad.is_active ? 'black' : 'gray'}
                      />
                    );
                  })}
              </HStack>
            )}
          </>
        )}
      </VStack>
    </ScrollView>
  );
};
