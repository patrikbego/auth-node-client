import React, { useEffect } from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Login from '../components/Login';
import controllers from '../api/controller';
import { useStateValue } from '../utils/reducers/StateProvider';
// import config from '../../config.local';

export default function LoginP({ URL }) {
  const [{ user, token, theme }, dispatch] = useStateValue();

  const palletType = theme ? 'dark' : 'light';
  const mainPrimaryColor = theme ? '#272c34' : '#fff';
  const mainSecondaryColor = theme ? '#fff' : '#272c34';
  const darkLightTheme = createMuiTheme({
    ...theme,
    palette: {
      type: palletType,
      // text: {
      //   primary: mainPrimaryColor,
      //   secondary: mainSecondaryColor,
      // },
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
      error: {
        main: red.A400,
      },
      background: {
        default: mainPrimaryColor,
      },
    },
    typography: {
      fontFamily: ['"Libre Barcode 39 Text"', 'Roboto'].join(','),
    },
    overrides: {
      MuiSvgIcon: {
        root: {
          '@media (max-width:600px)': {
            // fontSize: '1.0rem',
            fontSize: '1.0rem',
          },
          '@media (min-width:600px)': {
            // fontSize: '0.5rem',
            fontSize: '1.5rem',
          },
          color: mainSecondaryColor,
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={darkLightTheme}>
        <Login URL={URL} />
      </ThemeProvider>
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
