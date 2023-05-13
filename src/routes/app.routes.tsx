// import { ExerciseDTO } from '@dtos/ExerciseDTO';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { House, Tag } from 'phosphor-react-native';

import { Platform } from 'react-native';

import { AdDetails } from '@screens/AdDetails';
import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { NewAd } from '@screens/NewAd';
import { PreAd } from '@screens/PreAd';

// import ExerciseSvg from '@assets/exercise.svg';
// import HistorySvg from '@assets/history.svg';
// import HomeSvg from '@assets/home.svg';
// import ProfileSvg from '@assets/profile.svg';

type AppRoutesProps = {
  home: undefined;
  myAds: undefined;
  newAd: undefined;
  adDetails: undefined;
  preAd: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export const AppRoutes = () => {
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
        name="myAds"
        component={MyAds}
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
      {/* <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg
              width={iconSize}
              height={iconSize}
              fill={color}
            />
          ),
        }}
      /> */}
      <Screen
        name="newAd"
        component={NewAd}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="adDetails"
        component={AdDetails}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="preAd"
        component={PreAd}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
};
