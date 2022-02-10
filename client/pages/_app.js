import '../styles/globals.css'
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {useStore} from '../store'
import { wrapper } from "../store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const theme = createTheme({
  palette: {
    primary: {
      main: "#003032",
      background: "#f6f5eb",
      font: "#003032",
      secondaryFont: "#EFEDD8",
      button: "#FBCE60",
    },
    secondary: {
      main: "#003032",
    },
  },
  typography: {
    fontFamily: ["Poppins", "Merriweather", "Roboto", "Roboto Slab"].join(","),
    primaryFontFamily: "Poppins",
    headerFontFamily: "MerrriWeather",
  },
});

function MyApp({ Component, pageProps }) {
  const { store, persistor } = useStore(pageProps.initialReduxState);

  return (
  <>
  <Provider store={store}>
  <PersistGate loading={null}  persistor={store.__PERSISTOR}>
  <ThemeProvider theme={theme}>
  <Component {...pageProps} />
  </ThemeProvider>
  </PersistGate>
  </Provider>
  </>
  )
}

export default MyApp;
