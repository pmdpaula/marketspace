import { Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { Routes } from '@routes/index';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import { useCallback, useEffect, useState } from 'react';

import { View } from 'react-native';

import { THEME } from './src/theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // let [fontsLoaded] = useFonts({
  //   NunitoSans_400Regular,
  //   NunitoSans_700Bold,
  // });

  // async function prepare() {
  //   await SplashScreen.hideAsync();
  // }

  // if (!fontsLoaded) {
  //   return null;
  // } else {
  //   prepare();
  // }
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({ Karla_400Regular, Karla_700Bold });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        // console.log('App is ready');
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // console.log('App is not ready');

    return null;
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        style="dark"
        backgroundColor="transparent"
        translucent
      />
      <View
        onLayout={onLayoutRootView}
        style={{
          flex: 1,
        }}
      >
        <Routes />
      </View>
    </NativeBaseProvider>
  );
}
