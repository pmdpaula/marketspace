import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      700: '#101725',
      600: '#1A2242',
      500: '#2B3667',
      400: '#364D9D',
      300: '#647AC7',
      200: '#A5C5E5 ',
      100: '#A6B8E2',
    },
    blue: '#364D9D',
    bluelight: '#647AC7',
    gray: {
      1: '#1A181B',
      2: '#3E3A40',
      3: '#5F5B62',
      4: '#9F9BA1',
      5: '#D9D8DA',
      6: '#EDECEE',
      7: '#F7F7F8',
    },
    white: '#FFFFFF',
    redlight: '#EE7979',
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    11: 42,
    14: 56,
    25: 110,
    33: 148,
  },
});
