import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { FormHelperText } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import controllers from '../api/controller';
import Copyright from './Copyright';
import Phone from './formFields/Phone';
import Link from './Link';
import Email from './formFields/Email';
import TextFieldRequired from './formFields/TextFieldRequired';
import { useStateValue } from '../utils/reducers/StateProvider';
import { openAlertBar } from '../utils/alertBarUtils';

export default function EditProfile({ appUser }) {
  const [{ theme, user, token }, dispatch] = useStateValue();

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
          theme.palette.type === 'light'
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      // backgroundColor: 'red',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
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
    label: user ? user.lastName : 'Last Name',
    field: 'lname',
  };
  const fieldPropsFN = {
    requiredText: 'First name field is required',
    label: user ? user.firstName : 'First Name',
    field: 'fname',
  };
  const fieldPropsUN = {
    requiredText: 'User name field is required',
    label: user ? user.userName : 'User Name',
    field: 'uname',
  };

  const formValidation = (obj) => {
    console.log('formValidation');
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

  async function handleSubmit(event) {
    event.preventDefault();
    // formValidation(true);

    // const emailElement = event.target.email;
    const firstNameElement = event.target.fname;
    const lastNameElement = event.target.lname;
    const userNameElement = event.target.uname;
    // const phoneElement = event.target.phone;
    // const passwordElement = event.target.password;
    // const tAndCElement = event.target.tosAgreement;

    controllers.updateProfile(
      {
        // email: emailElement.value,
        // phone: phoneElement.value,
        firstName: firstNameElement.value ? firstNameElement.value : user.firstName,
        lastName: lastNameElement.value ? lastNameElement.value : user.lastName,
        userName: userNameElement.value ? userNameElement.value : user.userName,
        // password: passwordElement.value,
        // tosAgreement: tAndCElement.checked,
      },
    ).then(
      async (response) => {
        try {
          const res = await response.json();
          if (response.status !== 200) {
            setFetchErrorMsg(res);
          } else {
            await router.push('/');
            openAlertBar(dispatch, 'User has been updated', 'success');
          }
        } catch (e) {
          openAlertBar(dispatch, 'User update failed', 'error');
        }
      },
    ).catch(
      (e) => {
        console.log(e);
        if (e) {
          console.log(e);
          setFetchErrorMsg(e);
        } else {
          setFetchErrorMsg('User creation failed!');
        }
      },
    );
  }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Container onSubmit={handleSubmit} component="main" maxWidth="xs">
          <div className={classes.paper}>
            <>
              <Avatar className={classes.large}>
                {user
                  ? user.firstName
                  : 'Not logged in'}
              </Avatar>
              {/* <Typography component="h1" variant="h5"> */}
              {/*  Edit Profile */}
              {/* </Typography> */}
            </>
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
                  <Email disableCallback={disableCallback} user={user} />
                </Grid>
                <Grid item xs={12}>
                  <Phone disableCallback={disableCallback} user={user} />
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
                Update
              </Button>
              {fetchErrorMsg
                && <FormHelperText error>{fetchErrorMsg}</FormHelperText>}
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
