import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/router';
import Login from '../components/Login';
import controllers from '../api/controller';
import { useStateValue } from '../utils/reducers/StateProvider';
import muiSetter from '../utils/theme';
// import config from '../../config.local';

export default function LoginP({ URL }) {
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);

  return (
    <>
      {/* <StrictMode> */}
      <ThemeProvider theme={darkLightTheme}>
        <CssBaseline />
        <Login URL={URL} />
      </ThemeProvider>
      {/* </StrictMode> */}
    </>
  );
}

export async function getStaticProps() {
  const URL = controllers.url();
  return {
    props: {
      URL,
    },
  };
}
