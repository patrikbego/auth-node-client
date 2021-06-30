import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Login from '../components/Login';
import controllers from '../api/controller';
import { useStateValue } from '../utils/reducers/StateProvider';
import muiSetter from '../utils/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
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
  const URL = await controllers.url();
  console.log('URL', URL);
  // console.log('config.restApi', config.restApi);
  console.log('controllers.url()', controllers.url());
  console.log('URL', URL);
  console.log('controllers.url', controllers.URL);
  console.log('process.env.NEXT_PUBLIC_REST_API', process.env.NEXT_PUBLIC_REST_API);
  console.log('process.env.NEXT_PUBLIC_ENV_NAME', process.env.NEXT_PUBLIC_ENV_NAME);
  return {
    props: {
      URL,
    },
  };
}
