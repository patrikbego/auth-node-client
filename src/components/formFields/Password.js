import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function Password(props) {
  const firstRender = useRef(true);

  const [passwordError, setPasswordError] = useState(null);
  const [passwordValue, setPasswordValue] = useState('');

  const passwordValidation = () => {
    console.log('formValidation');
    setPasswordError(null);

    let valid = true;
    if (passwordValue.length < 10) {
      setPasswordError(
        'Password should be at least 10 characters long!',
      );
      valid = false;
    }

    if (valid) {
      setPasswordError(null);
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
    props.disableCallback(passwordValidation().disabled);
  }, [
    passwordValue]);

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      onChange={(e) => setPasswordValue(e.target.value)}
      error={!!passwordError}
      helperText={passwordError}
    />
  );
}
