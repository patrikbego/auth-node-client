import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrightnessMedium, ExitToApp, Info, VpnKey,
} from '@material-ui/icons';
import Image from 'next/image';
import IconButton from '@material-ui/core/IconButton';
import { Avatar, Tooltip } from '@material-ui/core';
import { useStateValue } from '../utils/reducers/StateProvider';
import controller from '../api/controller';
import Link from './Link';

const useStyles = makeStyles((defTheme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${defTheme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    // margin: theme.spacing(1, 1.5),
    // color: `${theme.palette.secondary.main}`,
  },
  heroContent: {
    padding: defTheme.spacing(8, 0, 6),
  },
  small: {
    width: defTheme.spacing(3),
    height: defTheme.spacing(3),
  },
  headerImg: {
    '@media (max-width:600px)': {
      width: 44,
    },
    '@media (min-width:600px)': {
      width: 60,
    },

  },
}));

function Header({ loading }) {
  const router = useRouter();
  const classes = useStyles();

  const [{ darkOrLiteTheme, user, token }, dispatch] = useStateValue();
  console.debug(user, token);
  const logout = async () => {
    try {
      await controller.logout();
      dispatch({
        type: 'SET_USER',
        user: null,
      });
      dispatch({
        type: 'SET_TOKEN',
        token: null,
      });
      await router.push('/');
    } catch (e) {
      console.error(e.message);
    }
  };

  const changeTheme = () => {
    dispatch({
      type: 'SET_THEME',
      darkOrLiteTheme: !darkOrLiteTheme,
    });
  };

  const linkText = loading && user ? `Welcome ${user.firstName}` : '';

  async function goToProfile() {
    await router.push(`/blogger/${user.userName}`);
  }

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        className={classes.appBar}
      >
        {token && user ? (
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link
                variant="h5"
                href="/"
                className={classes.link}
              >
                <div className={classes.headerImg}>
                  <Image
                    alt="OctoPlasm"
                    src="/images/octopus.svg"
                    layout="responsive"
                    objectFit="contain"
                    href="/"
                    width={60}
                    height={60}
                  />
                </div>
              </Link>
            </Typography>

            <nav>
              <Tooltip title="Profile" aria-label="Profile">
                <IconButton
                  aria-label="Profile"
                  onClick={goToProfile}
                >
                  <Avatar onClick={goToProfile} className={classes.small}>{user ? user.firstName : 'Not logged in'}</Avatar>
                </IconButton>
              </Tooltip>
            </nav>
            <nav>
              <Tooltip title="Change Color" aria-label="Change Color">
                <IconButton
                  aria-label="Change Color"
                  onClick={changeTheme}
                >
                  <BrightnessMedium />
                </IconButton>
              </Tooltip>
            </nav>
            <Tooltip title="Logout" aria-label="Logout">
              <IconButton
                aria-label="Logout"
                onClick={logout}
              >
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </Toolbar>
        ) : (
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link
                variant="h5"
                href="/"
                className={classes.link}
              >
                <div className={classes.headerImg}>
                  <Image
                    alt="OctoPlasm"
                    src="/images/octopus.svg"
                    layout="responsive"
                    objectFit="contain"
                    href="/"
                    width={60}
                    height={60}
                  />
                </div>
              </Link>
            </Typography>
            {/* TODO extract into component TooltipIcon */}
            <nav>
              <Tooltip title="Change Color" aria-label="Change Color">
                <IconButton
                  aria-label="Change Color"
                  onClick={changeTheme}
                >
                  <BrightnessMedium />
                </IconButton>
              </Tooltip>
            </nav>
            <nav>
              <Tooltip title="Info" aria-label="Info">
                <IconButton
                  aria-label="Info"
                  href="/about"
                >
                  <Info />
                </IconButton>
              </Tooltip>
            </nav>
            <Tooltip title="Login" aria-label="Login">
              <IconButton
                aria-label="Login"
                href="/login"
              >
                <VpnKey />
              </IconButton>
            </Tooltip>
          </Toolbar>
        )}
      </AppBar>
    </>
  );
}

export default Header;
