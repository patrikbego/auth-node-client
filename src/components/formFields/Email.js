import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';

export default function Email({disableCallback, user}) {
  const firstRender = useRef(true);

  const [emailError, setEmailError] = useState(null);
  const [emailValue, setEmailValue] = useState('');

  const emailValidation = () => {
    console.log('formValidation');
    setEmailError(null);

    let valid = true;
    if (!emailValue.match(
      '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    )) {
      setEmailError(
        'Email pattern is not accepted!',
      );
      valid = false;
    }

    if (valid) {
      setEmailError(null);
      return { disabled: false };
    }
    return { disabled: true };
  };
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    disableCallback(emailValidation().disabled);
  }, [emailValue]);

  let labelText = user ? user.email : 'Email Address';
  return (
    <TextField
      variant="outlined"
      required
      fullWidth
      id="email"
      label={labelText}
      name="email"
      autoComplete="email"
      onChange={(e) => setEmailValue(e.target.value)}
      error={!!emailError}
      helperText={emailError}
    />
  );
}
