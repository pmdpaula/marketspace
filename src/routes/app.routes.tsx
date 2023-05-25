import { FullNewAdDTO } from '@dtos/NewAdDTO';
import { ProductDTO } from '@dtos/ProductDTO';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { AdDetails } from '@screens/AdDetails';
import { NewAd } from '@screens/NewAd';
import { PreviewNewAd } from '@screens/PreviewNewAd';

import { TabRoutes } from './tabs.routes';

type AppRoutesProps = {
  // home: undefined;
  // myAds: undefined;
  appHome: undefined;
  newAd: undefined;
  adDetails: { product: ProductDTO };
  previewNewAd: { fullNewAd: FullNewAdDTO };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesProps>();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="appHome"
        component={TabRoutes}
      />
      <Screen
        name="newAd"
        component={NewAd}
      />
      <Screen
        name="adDetails"
        component={AdDetails}
      />
      <Screen
        name="previewNewAd"
        component={PreviewNewAd}
      />
    </Navigator>
  );
};
