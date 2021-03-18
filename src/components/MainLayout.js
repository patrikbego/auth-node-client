import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';
import controller from '../api/controller';
import { useStateValue } from '../utils/reducers/StateProvider';

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
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one'],
  },
  {
    title: 'Resources',
    description: [
      'Resource',
      'Resource name',
      'Another resource',
      'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export default function MainLayout({
  items = [],
  children,
}) {
  const elements = [];
  const [{ basket, user, token }, dispatch] = useStateValue();
  const classes = useStyles();
  const [fetchErrorMsg, setFetchErrorMsg] = useState('');
  const router = useRouter();
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
    <>
      <Header loading={loading} title="Bego.tips" />
      <div className="container">{children}</div>

      <Container
        maxWidth="sm"
        component="main"
        className={classes.heroContent}
      >
        <div>
          <h1>Next.js, Auth Example</h1>

          {loading && <p>Loading login info...</p>}

          {!loading && !user && (
          <>
            {fetchErrorMsg
                && <FormHelperText error>{fetchErrorMsg}</FormHelperText>}
            <p>
              You are not logged in!
            </p>
            <p>
              Once you have logged in you should be able to click in
              {' '}
              <i>Profile</i>
              {' '}
              and
              <i>Logout</i>
            </p>
          </>
          )}

          {!loading && user && (
          <>
            <h4>Rendered user info with nextjs</h4>
            <p>
              First Name:
              {user.firstName}
            </p>
            <p>
              Last Name:
              {user.lastName}
            </p>
            <p>
              Phone:
              {user.phone}
            </p>
            <p>
              Email:
              {user.email}
            </p>
            <p>
              Pass:
              {user.password}
            </p>
          </>
          )}
        </div>
      </Container>
      <main>
        <div className="container">{children}</div>
        <div>
          {elements}
        </div>
      </main>

      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </>
  );
}
