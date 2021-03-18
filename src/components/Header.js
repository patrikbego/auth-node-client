import Button from '@material-ui/core/Button';
import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BrightnessMedium } from '@material-ui/icons';
import { useStateValue } from '../utils/reducers/StateProvider';
import controller from '../api/controller';
import Link from './Link';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

function Header({ loading }) {
  const router = useRouter();
  const classes = useStyles();

  const [{ theme, user, token }, dispatch] = useStateValue();
  console.log(user, token);
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
      await router.push('/about');
    } catch (e) {
      console.log(e.message);
    }
  };

  const changeTheme = () => {
    dispatch({
      type: 'SET_THEME',
      theme: !theme,
    });
  };

  const linkText = loading && user ? `Welcome ${user.firstName}` : '';
  return (
    <>
      <AppBar
        theme="dark"
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        {!loading && (user ? (
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link
                variant="button"
                color="textPrimary"
                href="/"
                className={classes.link}
              >
                bego.tips
              </Link>
            </Typography>

            <nav>

              <Link
                variant="button"
                color="textPrimary"
                href="/profile"
                className={classes.link}
              >
                {linkText}
              </Link>

              <Link
                variant="button"
                color="textPrimary"
                href="/history"
                className={classes.link}
              >
                {user ? user.firstName : 'Not logged in'}
              </Link>
            </nav>
            <nav>
              <div onClick={changeTheme}>
                <BrightnessMedium />
              </div>
            </nav>
            <nav>
              <Link
                variant="button"
                color="textPrimary"
                href="/about"
                className={classes.link}
              >
                About
              </Link>
            </nav>
            <Button
              color="primary"
              variant="outlined"
              className={classes.link}
              onClick={logout}
            >
              Logout
            </Button>
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
                color="textPrimary"
                href="/"
                className={classes.link}
              >
                bego.tips
              </Link>
            </Typography>
            <nav>
              <div onClick={changeTheme}>
                <BrightnessMedium />
              </div>
            </nav>
            <nav>
              <Link
                variant="button"
                color="textPrimary"
                href="/about"
                className={classes.link}
              >
                About
              </Link>
              {/* <Link */}
              {/*  variant="button" */}
              {/*  color="textPrimary" */}
              {/*  href="/about" */}
              {/*  className={classes.link} */}
              {/* > */}
              {/*  About */}
              {/* </Link> */}
            </nav>
            <Button
              color="primary"
              variant="outlined"
              className={classes.link}
              component={Link}
              naked
              href="/login"
            >
              Login
            </Button>
          </Toolbar>
        ))}
      </AppBar>
    </>
  );
}

export default Header;
