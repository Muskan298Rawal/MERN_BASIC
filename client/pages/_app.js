import '../styles/globals.css'
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

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
  return (
  <>
  <ThemeProvider theme={theme}>
  <Component {...pageProps} />
  </ThemeProvider>
  </>
  )
}

export default MyApp
