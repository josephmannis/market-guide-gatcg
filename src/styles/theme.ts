// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  fonts: {
    body: `'Linux Biolinum', 'Times', serif`,
    heading: `'Linux Biolinum', 'Times', serif`,
  },
});

export default theme;
