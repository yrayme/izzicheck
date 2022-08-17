import React, { Fragment, useEffect } from "react";
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../../styles/globals.css'

import { AuthProvider } from '../contexts/useAuthContext'
import { ThemeProvider as ThemeProvide } from '../contexts/useThemeContext';
import { SignUpProvider } from "../contexts/SignUpContext";
import { StateProvider } from "../contexts/useStateContext";
import { AlertProvider } from "../contexts/useAlertContext";
import { AlertSimpleProvider } from "../contexts/useAlertSimpleContext";
import { TableProvider } from "../contexts/TableContext";

const theme = createTheme({
  palette: {
    primary: {
      main: '#22E38F',
    },
    secondary: {
      main: '#7F1FD4',
    },
    warning: {
      main: '#ed3e45',
    },
    info: {
      main: '#731e21',
    },
    error: {
      main: '#c62828',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Fragment>
      <Head>
        <meta name="description" content="Report"></meta>
        <link rel="icon" href="/assets/logo.png" />
        <title>izziCheck</title>
      </Head>
      <AuthProvider>
        <SignUpProvider>
          <TableProvider>
            <ThemeProvider theme={theme}>
              <ThemeProvide>
                <StateProvider>
                    <AlertProvider>
                      <AlertSimpleProvider>
                        <Component {...pageProps} />
                      </AlertSimpleProvider>
                    </AlertProvider>
                </StateProvider>
              </ThemeProvide>
            </ThemeProvider>
          </TableProvider>
        </SignUpProvider>
      </AuthProvider>
    </Fragment>
  )
}

export default MyApp