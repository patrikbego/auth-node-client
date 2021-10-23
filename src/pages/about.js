import React from 'react';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider, useTheme,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Link from 'next/link';
import Header from '../components/Header';
import { useStateValue } from '../utils/reducers/StateProvider';
import muiSetter from '../utils/theme';
import DynamicHead from '../components/DynamicHead';
import utilStyles from '../styles/utils.module.css';
import Footer from '../components/Footer';

export default function About() {
  const [{ user, token, darkOrLiteTheme }, dispatch] = useStateValue();
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);
  const [open, setOpen] = React.useState(false);
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      height: '100vh',
    },
    h1: {
      color: 'tomato',
      textAlign: 'center',
      fontSize: '2em',
      paddingTop: '6vh',
    },
    h2: {
      color: 'tomato',
      textAlign: 'center',
      fontSize: '1.5em',
    },
    h3: {
      color: 'tomato',
      textAlign: 'left',
      fontSize: '1em',
      paddingLeft: '9vw',

    },

    mainLayoutContainer: {
      maxWidth: '80%',
      padding: '0 1rem',
      margin: '1rem auto 6rem',
      textAlign: 'center',
    },
  }));
  const classes = useStyles(darkLightTheme);

  const meta = {
    shareUrl: 'https://octoplasm.com',
    keywords: 'Put Your Thoughts Online',
    description: 'Put Your Thoughts Online ;)',
    title: 'OctoPlasm',
  };
  return (
    <>
      <DynamicHead meta={meta} />
      <ThemeProvider theme={darkLightTheme}>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Header loading={false} />
          </AppBar>
          <div className={classes.mainLayoutContainer}>
            <div>
              <br />
              <p className={classes.h1}>OctoPlasm</p>
              <p className={classes.h2}>
                Easy Way to Share Your Ideas,
                Knowledge and Views With the World
              </p>

              <p className={classes.h3}>
                <Link href="/signup" variant="body2">
                  <a className={utilStyles.a}>1. Create a profile</a>
                </Link>
              </p>
              <p className={classes.h3}>
                <Link href="/login" variant="body2">
                  <a className={utilStyles.a}>2. SignIn</a>
                </Link>
              </p>
              <p className={classes.h3}>
                <Link href="/blog/0" variant="body2">
                  <a className={utilStyles.a}>
                    3. And you are ready to do your first post,
                    or create a private draft,
                    visible only to you.
                  </a>
                </Link>
              </p>
              <br />
              <p className={classes.h3}>
                <Link href="/" variant="body2">
                  <a className={utilStyles.a}>
                    Or alternatively, you can
                    just explore what other people are writing about &#129488;
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
}
