import { useAuth } from '@hooks/useAuth';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';

// import { useState } from 'react';
import { Loading } from '@components/Loading';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

// import { TabRoutes } from './tabs.routes';

export const Routes = () => {
  // const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(false);
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();
  // const user = { id: '1' };

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[200];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box
      flex={1}
      bg="gray.7"
    >
      <NavigationContainer theme={theme}>
        {user?.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
