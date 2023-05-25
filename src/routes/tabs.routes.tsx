// import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { ProductDTO } from '@dtos/ProductDTO';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { House, SignOut as SignOutIcon, Tag } from 'phosphor-react-native';

import { Platform } from 'react-native';

import { Home } from '@screens/Home';
import { SignOut } from '@screens/SignOut';
import { UserAds } from '@screens/UserAds';

// import ExerciseSvg from '@assets/exercise.svg';
// import HistorySvg from '@assets/history.svg';
// import HomeSvg from '@assets/home.svg';
// import ProfileSvg from '@assets/profile.svg';

type TabRoutesProps = {
  home: undefined;
  userAds: { userAds: ProductDTO[] };
  signOut: undefined;
};

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<TabRoutesProps>();

export const TabRoutes = () => {
  const { colors, sizes } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[600],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[100],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[8],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House
              color={color}
              size={iconSize}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />

      <Screen
        name="userAds"
        component={UserAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag
              color={color}
              size={iconSize}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />

      <Screen
        name="signOut"
        component={SignOut}
        options={{
          tabBarIcon: ({ focused }) => (
            <SignOutIcon
              color={colors.red[300]}
              size={iconSize}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
    </Navigator>
  );
};
