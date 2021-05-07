import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Tooltip } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
  Create,
} from '@material-ui/icons';
import { useStateValue } from '../utils/reducers/StateProvider';
import controller from '../api/controller';
import Header from './Header';

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
}));

export default function MainLayout({
  children, appUser,
}) {
  const [{ user, token }, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  async function addArticle() {
    // TODO check if logged in
    await router.push('/blog');
  }
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
  function parseJwt(jwt) {
    if (!jwt) return null;
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('')
      .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
    const pjwt = JSON.parse(jsonPayload);
    if (pjwt.exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem('token');
    }
    return pjwt;
  }

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
          user: parseJwt(localStorage.getItem('token')).user,
        });
        dispatch({
          type: 'SET_TOKEN',
          token: validateJwt(localStorage.getItem('token')),
        });
        console.log(token);
      }
    }
  });
  function useFetchUser() {
    const [loading, setLoading] = useState(() => !user);

    useEffect(
      () => {
        if (!loading && user) {
          return;
        }
        setLoading(true);
        // let isMounted = true;
        console.log(loading, 'before call');

        console.log(user);
        setLoading(false);
        console.log(loading, 'after call');
        // return () => {
        //   isMounted = false;
        // };
      },
      [],
    );

    return { loading };
  }

  const { loading } = useFetchUser();
  return (
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
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl'
                ? <ChevronRightIcon />
                : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <Divider />
          <List>
            {/*  Button bar */}
            <ListItem
              button
              onClick={() => {
                addArticle();
                console.log('clicked');
              }}
            >
              <Tooltip title="Create New Article" placement="right">
                <ListItemIcon>
                  <Create />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
          </List>
        </Drawer>
      ) : (<></>)}
      <main>
        <div className="container">{children}</div>
      </main>

    </div>
  );
}
