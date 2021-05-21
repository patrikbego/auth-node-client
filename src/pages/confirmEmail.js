import React, { StrictMode, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import { FormHelperText } from '@material-ui/core';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import controllers from '../api/controller';

export default function ConfirmEmail() {
  const [fetchErrorMsg, setFetchErrorMsg] = useState();
  const [token, setToken] = useState();
  const router = useRouter();
  const path = router.asPath;
  const urlParams = new URLSearchParams(
    path.substr('/confirmEmail'.length + 1, path.length),
  );
  const urlToken = urlParams.get('token');
  if (urlToken && token !== urlToken) {
    console.log('CONFIRMING EMAIL for token', urlToken);
    setToken(urlToken);
    controllers.confirmEmail({
      id: urlToken,
      email: urlParams.get('email'),
      phone: urlParams.get('phone'),
    })
      .then(
        async (response) => {
          try {
            const res = await response.json();
            if (response.status !== 200) {
              setFetchErrorMsg(res);
            } else {
              await router.push('/login?status=confirmed');
            }
          } catch (e) {
            console.error(e);
            setFetchErrorMsg('Email confirmation failed!');
          }
        },
      )
      .catch(
        (e) => {
          console.log(e);
          if (e) {
            console.log(e);
            setFetchErrorMsg(e);
          } else {
            setFetchErrorMsg('Email confirmation failed!');
          }
        },
      );
  }
  return (
    <StrictMode>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {fetchErrorMsg
            && <FormHelperText error>{fetchErrorMsg}</FormHelperText>}
            {!fetchErrorMsg
            && (
            <FormHelperText>
              Email has been sent. Please Confirm
              Email.
            </FormHelperText>
            )}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            naked
            href="/"
          >
            Go to the main page
          </Button>
        &nbsp;
          <Button
            variant="contained"
            color="primary"
            component={Link}
            naked
            href="/resend"
          >
            Resend Email
          </Button>
          {/* <ProTip/> */}
          <Copyright />
        </Box>
      </Container>
    </StrictMode>
  );
}
