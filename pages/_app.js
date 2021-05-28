import Head from 'next/head';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import wrapper from '../store/configureStore';

const YDShop = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <Head>
        <title>YDConnect Shop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(YDShop);
