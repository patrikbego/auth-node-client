import React, { useEffect, StrictMode } from 'react';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import {
  red,
} from '@material-ui/core/colors';
import controllers from '../api/controller';
import MainLayout from '../components/MainLayout';
import {
  useStateValue,
} from '../utils/reducers/StateProvider';
import MainList from '../components/oldPosts/mainList';
import AlertBar from '../components/AlertBar';

export default function Home({ items, appUser, postsData }) {
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
      // MuiAppBar: {
      //   root: {
      //     color: 'red',
      //     backgroundColor: 'red',
      //     background: {
      //       color: 'red',
      //       default: theme ? '#303030' : '#fff',
      //     },
      //   },
      // },
    },
  });

  function validateJwt(jwt) {
    const pjwt = parseJwt(jwt);
    if (pjwt.exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem('token');
    }
    return jwt;
  }

  function parseJwt(jwt) {
    if (!jwt) return null;
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('')
      .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
    const pjwt = JSON.parse(jsonPayload);
    console.log('pjwt', pjwt);
    return pjwt;
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const lsToken = localStorage.getItem('token');
      if (!token && lsToken
        && validateJwt(lsToken)) {
        dispatch({
          type: 'SET_USER',
          user: parseJwt(lsToken).user,
        });
        dispatch({
          type: 'SET_TOKEN',
          token: lsToken,
        });
        console.log(token);
      }
    }
  });

  return (
    <StrictMode>
      <ThemeProvider theme={darkLightTheme}>
        <MainLayout items={items} user={appUser}>
          <AlertBar />
          <MainList postsData={postsData} />
        </MainLayout>
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
  const postsData = await controllers.getBlogs();
  // Here we are getting user from server (just as an example of prerendering).
  // Actually we should get user from token
  const appUser = await controllers.getUser();
  return {
    props: {
      items,
      appUser,
      postsData,
    },
  };
}
