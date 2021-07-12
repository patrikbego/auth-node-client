import React from 'react';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider, useTheme,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Header from '../components/Header';
import { useStateValue } from '../utils/reducers/StateProvider';
import muiSetter from '../utils/theme';
import DynamicHead from '../components/DynamicHead';

export default function About() {
  const [{ user, token, darkOrLiteTheme }, dispatch] = useStateValue();
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);
  const [open, setOpen] = React.useState(false);
  const useStyles = makeStyles(() => ({
    h1: {
      color: 'tomato',
      textAlign: 'center',
      fontSize: '8vw',
      paddingTop: '6vh',
    },
    h2: {
      color: 'tomato',
      textAlign: 'center',
      fontSize: '5vw',
    },
    h3: {
      color: 'tomato',
      textAlign: 'left',
      fontSize: '4vw',
      paddingLeft: '9vw',

    },

  }));
  const classes = useStyles(darkLightTheme);

  const meta = {
    shareUrl: 'https://octoplasm.com',
    keywords: 'put your thoughts on online',
    description: 'Easiest way to put your thoughts  ;)',
    title: 'OctoPlasm',
  };
  return (
    <>
      <DynamicHead meta={meta} />
      <ThemeProvider theme={darkLightTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Header loading={false} />
          </AppBar>

          <>
            <br />
            <p className={classes.h1}>OctoPlasm</p>
            <p className={classes.h2}>
              The easy way to share your ideas,
              knowledge or views with the world.
            </p>

            <p className={classes.h3}>1. Create a profile</p>
            <p className={classes.h3}>2. SignIn</p>
            <p className={classes.h3}>3. And you are ready to do your first post</p>
            <p className={classes.h3}>
              4. Or alternatively
              just explore what other people are writing about &#129488;
            </p>
          </>

        </div>

      </ThemeProvider>
    </>
  );
}
