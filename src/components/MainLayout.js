import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { useStateValue } from '../utils/reducers/StateProvider';
import Header from './Header';
import MainLayoutDrawer from './MainLayoutDrawer';
import {parseJwt, tokenSetter, validateJwt} from '../utils/tokenUtils';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
    background: `${theme.palette.primary.main}`,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '50%',
  },
  listButton: {
    marginLeft: 1,
  },
  iconText: {
    display: 'flex',
    textDecoration: 'none',
    flexDirection: 'column',
    // marginTop: theme.spacing(1),
    // color: `${theme.palette.text.secondary}CC`,
    // transition: theme.transitions.create(['opacity', 'color']),
    // fontSize: 0.5,
    // display: 'flex',
    // justifyContent: 'flex-end',
  },

  mainLayoutContainer: {
    maxWidth: '80%',
    padding: '0 1rem',
    margin: '6rem auto 6rem',
    textAlign: 'center',
  },

  mainLayoutHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  mainLayout: {
    width: '6rem',
    height: '6rem',
  },

  mainHeaderHomeImage: {
    width: '8rem',
    height: '8rem',
  },

  backToHome: {
    margin: '3rem 0 0',
  },

}));

export default function MainLayout({
  children, appUser, mainPage, itemId,
}) {
  console.log('MainLayout', itemId);
  const [{ user, token }, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  tokenSetter(token, dispatch, useEffect);
  // useEffect(() => {
  //   if (typeof localStorage !== 'undefined') {
  //     if (!token && localStorage.getItem('token')) {
  //       dispatch({
  //         type: 'SET_USER',
  //         user: parseJwt(localStorage.getItem('token')).user,
  //       });
  //       dispatch({
  //         type: 'SET_TOKEN',
  //         token: validateJwt(localStorage.getItem('token')),
  //       });
  //       console.log('MainLayout token', token);
  //     }
  //   }
  // });
  function useFetchUser() {
    const [loading, setLoading] = useState(() => !user);

    useEffect(
      () => {
        if (!loading && user) {
          return;
        }
        setLoading(true);
        console.log(loading, 'before call');

        console.log(user);
        setLoading(false);
        console.log(loading, 'after call');
      },
      [],
    );

    return { loading };
  }

  const { loading } = useFetchUser();
  return (
    <>
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

        {token && user ? (
          <MainLayoutDrawer
            classes={classes}
            open={open}
            theme={theme}
            mainPage={mainPage}
            itemId={itemId}
          />
        ) : (<></>)}
        <div className={classes.mainLayoutContainer}>{children}</div>
      </div>
    </>
  );
}
