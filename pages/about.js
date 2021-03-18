import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProTip from '../src/components/ProTip';
import Link from '../src/components/Link';
import Copyright from '../src/components/Copyright';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import { useStateValue } from '../src/utils/reducers/StateProvider';

export default function About() {
  const [{ user, token, theme }, dispatch] = useStateValue();

  return (
    <>
      <Header loading={false} title="Bego.tips" />
      <Container maxWidth="sm">
        <p>
          User:
          {user ? user.firstName : 'Not logged in'}
        </p>
        <p>
          Token:
          {token}
        </p>
        <p>
          Theme:
          {theme}
        </p>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Button variant="contained" color="primary" component={Link} naked href="/">
            Go to the main page
          </Button>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </>
  );
}
