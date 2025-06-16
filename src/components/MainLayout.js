import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { useStateValue } from '../utils/reducers/StateProvider';
import Header from './Header';
import MainLayoutDrawer from './MainLayoutDrawer';
import { tokenSetter } from '../utils/tokenUtils';
import PrivacyPopup from './PrivacyPopUp';

const drawerWidth = 240;

const useStyles = makeStyles((defTheme) => ({
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
    zIndex: defTheme.zIndex.drawer + 1,
    transition: defTheme.transitions.create(['width', 'margin'], {
      easing: defTheme.transitions.easing.sharp,
      duration: defTheme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: defTheme.transitions.create(['width', 'margin'], {
      easing: defTheme.transitions.easing.sharp,
      duration: defTheme.transitions.duration.enteringScreen,
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
    transition: defTheme.transitions.create('width', {
      easing: defTheme.transitions.easing.sharp,
      duration: defTheme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: defTheme.transitions.create('width', {
      easing: defTheme.transitions.easing.sharp,
      duration: defTheme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: defTheme.spacing(6) + 1,
    [defTheme.breakpoints.up('sm')]: {
      width: defTheme.spacing(7) + 1,
    },
    background: `${defTheme.palette.primary.main}`,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: defTheme.spacing(0, 1),
    // necessary for content to be below app bar
    ...defTheme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: defTheme.spacing(3),
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
    margin: '2.5rem auto 2.5rem',
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
  children,
  user,
  mainPage,
  itemId,
  token,
  postData,
  shareUrl,
  searchTerm = '',
  setSearchTerm = () => {},
}) {
  const [{}, dispatch] = useStateValue();
  const classes = useStyles();
  const defMaterialTheme = useTheme();
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
  // function useFetchUser() {
  //   const [loading, setLoading] = useState(() => !user);
  //
  //   useEffect(
  //     () => {
  //       if (!loading && user) {
  //         return;
  //       }
  //       setLoading(true);
  //       console.log(loading, 'before call');
  //
  //       console.log(user);
  //       setLoading(false);
  //       console.log(loading, 'after call');
  //     },
  //     [],
  //   );
  //
  //   return { loading };
  // }
  //
  // const { loading } = useFetchUser();
  // if (token) {
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: false,
          })}
        >
          <Header
            loading={false}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </AppBar>
        <MainLayoutDrawer
          classes={classes}
          open={false}
          theme={defMaterialTheme}
          mainPage={mainPage}
          itemId={itemId}
          postData={postData}
          shareUrl={shareUrl}
        />
        <div className={classes.mainLayoutContainer}>
          {children}
        </div>
      </div>
      <PrivacyPopup />
    </>
  );
  // }
  // return (
  //   <>
  //     <div className={classes.root}>
  //       <CssBaseline />
  //       <AppBar
  //         position="fixed"
  //         className={clsx(classes.appBar, {
  //           [classes.appBarShift]: false,
  //         })}
  //       >
  //         <Header loading={false} />
  //       </AppBar>
  //       <div className={classes.mainLayoutContainer}>{children}</div>
  //     </div>
  //     <Footer />
  //   </>
  // );
}
