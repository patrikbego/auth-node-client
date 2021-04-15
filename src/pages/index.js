import React, { useEffect, StrictMode } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  deepOrange,
  deepPurple,
  lightBlue,
  orange, red,
} from '@material-ui/core/colors';
import controllers from '../api/controller';
import MainLayout from '../components/MainLayout';
import {
  useStateValue,
} from '../utils/reducers/StateProvider';

export default function Home({ items, appUser }) {
  const [{ user, token, theme }, dispatch] = useStateValue();

  const palletType = theme ? 'dark' : 'light';
  const mainPrimaryColor = theme ? orange[500] : lightBlue[500];
  const mainSecondaryColor = theme ? deepOrange[900] : deepPurple[500];
  const darkLightTheme = createMuiTheme({
    type: palletType,
    palette: {
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
        default: theme ? 'grey' : '#fff',
      },
    },
  });

  function validateJwt(jwt) {
    if (!jwt) return null;
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('')
      .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
    const pjwt = JSON.parse(jsonPayload);
    if (pjwt.exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem('token');
    }
    return jwt;
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      if (!token && localStorage.getItem('token')) {
        dispatch({
          type: 'SET_USER',
          user: appUser,
        });
        dispatch({
          type: 'SET_TOKEN',
          token: validateJwt(localStorage.getItem('token')),
        });
        console.log(token);
      }
    }
  });

  return (
    <StrictMode>
      <ThemeProvider theme={darkLightTheme}>
        <MainLayout items={items} user={appUser} />
      </ThemeProvider>
    </StrictMode>
  );
}

export async function getServerSideProps() {

  console.log('controllers.url()', controllers.url());
  console.log('URL', URL);
  console.log('controllers.url', controllers.URL);
  console.log('process.env.NEXT_PUBLIC_REST_API', process.env.NEXT_PUBLIC_REST_API);
  console.log('process.env.NEXT_PUBLIC_REST_API1', process.env.NEXT_PUBLIC_REST_API);
  console.log('process.env.envNameEnv', process.env.envNameEnv);
  console.log('process.env.restApiEnv', process.env.restApiEnv);
  console.log('process.env.NEXT_PUBLIC_ENV_NAME', process.env.NEXT_PUBLIC_ENV_NAME);
  console.log('process.env.NEXT_PUBLIC_ENV_NAME1', process.env.NEXT_PUBLIC_ENV_NAME);

  const items = await controllers.getItems();
  // Here we are getting user from server (just as an example of prerendering).
  // Actually we should get user from token
  const appUser = await controllers.getUser();
  return {
    props: {
      items,
      appUser,
    },
  };
}
