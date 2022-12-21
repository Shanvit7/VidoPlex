import '../styles/globals.css';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { ChakraProvider,extendTheme} from '@chakra-ui/react';

const theme=extendTheme({
  styles:{
    global:{
      body:{
        bg:'black',
        color:'#a742f5'
      }
    }
  }
});

const App=({ Component, pageProps })=>{
  return (
    <Provider store={store}>
       <ChakraProvider theme={theme}>
         <Component {...pageProps} />
       </ChakraProvider>
    </Provider>
  )
}

export default App;
