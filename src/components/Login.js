import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { FormHelperText } from '@material-ui/core';
import Link from 'next/link';
import Copyright from './Copyright';
import controllers from '../api/controller';
import Password from './formFields/Password';
import Email from './formFields/Email';
import facebookService from '../utils/facebookService';
import googleService from '../utils/googleService';
import { useStateValue } from '../utils/reducers/StateProvider';
import Header from './Header';
import utilStyles from '../styles/utils.module.css';
import { handleErrors } from '../api/utils';

export default function Login({ URL }) {
  const GENERAL_ERROR = 'Something went wrong! Please try again later or contact support@octoplasm.com';
  const useStyles = makeStyles((defTheme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
          defTheme.palette.type === 'light'
            ? defTheme.palette.grey[50]
            : defTheme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: defTheme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: defTheme.spacing(1),
      backgroundColor: defTheme.palette.primary.main,
    },
    link: {
      // margin: theme.spacing(1, 1.5),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: defTheme.spacing(1),
    },
    submit: {
      margin: defTheme.spacing(3, 0, 2),
    },
  }));

  // TODO consider loading this async / in the background
  try {
    facebookService.initFacebookSdk().then(console.info('fb initialized'));
    googleService.init().then(console.log('google initialized'));
  } catch (e) {
    console.error('Social init failed -> ', e);
  }

  const [{ user, token, darkOrLiteTheme }, dispatch] = useStateValue();

  const classes = useStyles();
  const [disable, setDisabled] = useState(true);
  const [fetchErrorMsg, setFetchErrorMsg] = useState();
  const router = useRouter();
  const { message } = router.query;
  const disableCallback = (childData) => {
    setDisabled(childData);
  };
  function setAuthState(res) {
    dispatch({
      type: 'SET_USER',
      user: res.user,
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', res.token);
      // document.cookie = `devst=${res.token};max-age=604800;domain=bego.tips`;
      document.cookie = `devst=${res.token};max-age=604800`;
    }
    dispatch({
      type: 'SET_TOKEN',
      token: res.token,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const emailElement = event.target.email;
    const passwordElement = event.target.password;
    controllers.URL = URL;
    controllers.signIn(
      {
        email: emailElement.value,
        password: passwordElement.value,
      },
    ).then(handleErrors).then(async (response) => {
      console.log('Inside of 1then -> ', response);
      const data = await response.json();
      console.log('Inside of 2then -> ', data);
      setAuthState(data);
      await router.push('/');
    }).catch((error) => {
      console.error('User login failed! ---- >', error);
      if (!error.message) error.message = GENERAL_ERROR;
      setFetchErrorMsg(error.message);
    });
  }

  async function loginWithFacebook() {
    const res = await facebookService.login();
    if (res) {
      setAuthState(res);
      await router.push('/');
    } else {
      setFetchErrorMsg(res);
      console.error('fb login failed');
    }
  }

  async function loginWithFacebook1() {
    const FB = await facebookService.initFacebookSdk();

    FB.login(async (response) => {
      console.debug('login response', response);
      const options = facebookService.processAuthResponse(
        response.authResponse,
      );
      console.debug('login options', options);
      if (options) {
        controllers.loginWithFbReq(options).then(async (res) => {
          const resBody = await res.json();
          if (!res.ok) {
            setFetchErrorMsg(resBody);
            console.error('fb login failed');
          } else {
            console.log(resBody);
            setAuthState(resBody);
            await router.push('/');
          }
        }).catch((error) => {
          console.error(error.stackTrace);
          setFetchErrorMsg(error.message);
          console.error('fb login failed');
        });
      }
    });
  }

  async function loginWithGoogle() {
    googleService.loginWithG().then(async (response) => { // TODO handle errors
      // gapi.grantOfflineAccess().then(async (response) => {

      if (response.error) {
        // An error happened!
        setFetchErrorMsg(response.error);
        console.error('google login failed', response.error);
        return;
      }

      console.debug('login response', response);
      const options = googleService.processAuthResponse(
        response && response.accessToken
          ? response.accessToken
          : response.getAuthResponse().access_token,
      );
      console.log('login options', options);
      if (options) {
        controllers.loginWithGooglReq(options).then(async (res) => {
          const resBody = await res.json();
          if (!res.ok) {
            setFetchErrorMsg(resBody);
            console.error('google login failed');
          } else {
            console.log(resBody);
            setAuthState(resBody);
            await router.push('/');
          }
        }).catch((error) => {
          console.error(error.stackTrace);
          setFetchErrorMsg(error.message);
          console.error('google login failed');
        });
      }
      console.debug(user);
    });
  }

  // You can also now use gapi.client to perform authenticated requests.

  return (

    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Header loading={false} />
        <div className={classes.paper}>
          <Link
            variant="button"
            href="/"
            className={classes.link}
          >
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Link>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Email disableCallback={disableCallback} />
              </Grid>
              <Grid item xs={12}>
                <Password disableCallback={disableCallback} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={disable}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginWithFacebook1}
            >
              Sign In with Facebook
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginWithGoogle}
            >
              Sign In with Google
            </Button>
            {fetchErrorMsg
              && <FormHelperText error>{fetchErrorMsg}</FormHelperText>}
            {message
                && <FormHelperText error>{message}</FormHelperText>}
            <Grid container>
              <Grid item xs>
                <Link
                  className={utilStyles.a}
                  href="/forgotPassword"
                  variant="body2"
                >
                  <a className={utilStyles.a}>Forgot password?</a>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  <a className={utilStyles.a}>
                    Don't have an account? Sign
                    Up
                  </a>
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
