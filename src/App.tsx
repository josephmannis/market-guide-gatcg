import { ChakraProvider, VStack } from '@chakra-ui/react';
import theme from './styles/theme.ts';
import { Products } from './pages/products.tsx';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack maxWidth="100%" justifyItems="center" pt="5%">
        <Products />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
