import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { FormHelperText } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import controllers from '../api/controller';
import Copyright from './Copyright';
import Phone from './formFields/Phone';
import Password from './formFields/Password';
import Link from './Link';
import Email from './formFields/Email';
import TextFieldRequired from './formFields/TextFieldRequired';

export default function SignUp({ appUser }) {
  const useStyles = makeStyles((defTheme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
          defTheme.palette.type === 'light'
            ? defTheme.palette.grey[50]
            : defTheme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      marginTop: defTheme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: defTheme.spacing(1),
      backgroundColor: defTheme.palette.primary.main,
      // backgroundColor: 'red',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: defTheme.spacing(3),
    },
    submit: {
      margin: defTheme.spacing(3, 0, 2),
    },
  }));

  const firstRender = useRef(true);

  const [disable, setDisabled] = useState(true);
  const [tosError, setTosError] = useState(null);
  const [tosValue, setTosValue] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState();

  const disableCallback = (childData) => {
    setDisabled(childData);
  };

  const fieldPropsLN = {
    requiredText: 'Last name field is required',
    label: 'Last Name',
    field: 'lname',
  };
  const fieldPropsFN = {
    requiredText: 'First name field is required',
    label: 'First Name',
    field: 'fname',
  };
  const fieldPropsUN = {
    requiredText: 'User name field is required',
    label: 'User Name',
    field: 'uname',
  };

  const formValidation = (obj) => {
    setTosError(null);

    let valid = true;
    if (!tosValue) {
      setTosError(
        'T&C must be accepted!',
      );
      valid = false;
    }

    if (valid) {
      setTosError(null);
      return { disabled: false };
    }
    return { disabled: true };
  };

  // it sets the value of fields (in our case on change)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisabled(formValidation().disabled);
  }, [
    tosValue]);

  const classes = useStyles();

  const router = useRouter();
  const { message } = router.query;

  async function handleSubmit(event) {
    event.preventDefault();
    // formValidation(true);

    const emailElement = event.target.email;
    const firstNameElement = event.target.fname;
    const lastNameElement = event.target.lname;
    const userNameElement = event.target.uname;
    const phoneElement = event.target.phone;
    const passwordElement = event.target.password;
    const tAndCElement = event.target.tosAgreement;

    controllers.signUp(
      {
        email: emailElement.value,
        phone: phoneElement.value,
        firstName: firstNameElement.value,
        lastName: lastNameElement.value,
        userName: userNameElement.value,
        password: passwordElement.value,
        tosAgreement: tAndCElement.checked,
      },
    ).then(
      async (response) => {
        try {
          const res = await response.json();
          if (response.status !== 200) {
            setFetchErrorMsg(res);
          } else {
            await router.push('/confirmEmail');
          }
        } catch (e) {
          setFetchErrorMsg('User creation failed!');
        }
      },
    ).catch(
      (e) => {
        console.error('User creation failed!', e);
        setFetchErrorMsg('Something went wrong! Please try again later or contact support@octoplasm.com');
      },
    );
  }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        {fetchErrorMsg}
        <Container onSubmit={handleSubmit} component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextFieldRequired
                    disableCallback={disableCallback}
                    fieldProps={fieldPropsFN}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldRequired
                    disableCallback={disableCallback}
                    fieldProps={fieldPropsLN}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldRequired
                    disableCallback={disableCallback}
                    fieldProps={fieldPropsUN}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Email disableCallback={disableCallback} />
                </Grid>
                <Grid item xs={12}>
                  <Phone disableCallback={disableCallback} />
                </Grid>
                <Grid item xs={12}>
                  <Password disableCallback={disableCallback} />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        color="primary"
                        required
                        id="tosAgreement"
                        value={tosValue}
                        name="tosAgreement"
                        onChange={(e) => {
                          setTosValue((tosValue) => !tosValue);
                          console.info('changed to ',
                            e.target.value);
                        }}
                      />
                        )}
                    label="I accept T&C"
                  />
                  {tosError
                    && <FormHelperText error>{tosError}</FormHelperText>}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={disable}
              >
                Sign Up
              </Button>
              {fetchErrorMsg
                && <FormHelperText error>{fetchErrorMsg}</FormHelperText>}
              {message
                && <FormHelperText error>{message}</FormHelperText>}
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                  <Link href="/" variant="body2">
                    Home
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </>
  );
}
