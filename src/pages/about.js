import React from 'react';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
import Link from 'next/link';
import Header from '../components/Header';
import { useStateValue } from '../utils/reducers/StateProvider';
import muiSetter from '../utils/theme';
import DynamicHead from '../components/DynamicHead';
import utilStyles from '../styles/utils.module.css';
import Footer from '../components/Footer';

export default function About() {
  const [{user, token, darkOrLiteTheme}, dispatch] = useStateValue();
  const {darkLightTheme} = muiSetter(useStateValue, createMuiTheme);
  const [open, setOpen] = React.useState(false);
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    mainContainer: {
      flex: 1,
      marginTop: '6rem',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    title: {
      color: '#F26B5C',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#F26B5C',
      marginBottom: '1rem',
    },
    listItem: {
      color: '#F26B5C',
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
        <DynamicHead meta={meta}/>
        <ThemeProvider theme={darkLightTheme}>
          <CssBaseline/>
          <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                })}
            >
              <Header loading={false}/>
            </AppBar>
            <Container maxWidth="sm" className={classes.mainContainer}>
              <Typography variant="h3"
                          className={classes.title}>OctoPlasm</Typography>
              <Typography variant="h5" className={classes.subtitle}>
                Share your knowledge and ideas with the world
              </Typography>
              <List>
                <ListItem className={classes.listItem}>
                  <Link href="/signup" variant="body2">
                    <a className={utilStyles.a}>Create your profile</a>
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link href="/login" variant="body2">
                    <a className={utilStyles.a}>Sign in</a>
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link href="/blog/0" variant="body2">
                    <a className={utilStyles.a}>
                      Post your first article or start a private draft
                    </a>
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link href="/" variant="body2">
                    <a className={utilStyles.a}>Browse what others are
                      writing</a>
                  </Link>
                </ListItem>
              </List>
            </Container>
            <Footer/>
          </div>
        </ThemeProvider>
      </>
  );
}
