import { FullNewAdDTO } from '@dtos/NewAdDTO';
import { DatabaseProductDTO } from '@dtos/ProductDTO';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { AdDetails } from '@screens/AdDetails';
import { AdEdit } from '@screens/AdEdit';
import { AdNew } from '@screens/AdNew';
import { AdPreview } from '@screens/AdPreview';
import { AdView } from '@screens/AdView';

import { TabRoutes } from './tabs.routes';

type AppRoutesProps = {
  appHome: undefined;
  adNew: undefined;
  adEdit: { product: DatabaseProductDTO } | undefined;
  // adDetails: { product: DatabaseProductDTO };
  adDetails: { adId: DatabaseProductDTO['id'] };
  adPreview: { fullAdData: FullNewAdDTO };
  adView: { adId: DatabaseProductDTO['id'] };
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
        name="adNew"
        component={AdNew}
      />
      <Screen
        name="adEdit"
        component={AdEdit}
      />
      <Screen
        name="adDetails"
        component={AdDetails}
      />
      <Screen
        name="adPreview"
        component={AdPreview}
      />
      <Screen
        name="adView"
        component={AdView}
      />
    </Navigator>
  );
};
