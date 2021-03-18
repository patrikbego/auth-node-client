import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';

export default function Phone(props) {
  const firstRender = useRef(true);

  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState(null);

  const phoneValidation = () => {
    console.log('formValidation');
    setPhoneError(null);

    let valid = true;
    if (!phoneValue.match(
      '^(\\+{0,})(\\d{0,})([(]{1}\\d{1,3}[)]{0,}){0,}(\\s?\\d+|\\+\\d{2,3}\\s{1}\\d+|\\d+){1}[\\s|-]?\\d+([\\s|-]?\\d+){1,2}(\\s){0,}$',
    )) {
      setPhoneError('Phone number pattern is not accepted!');
      valid = false;
    }

    if (valid) {
      setPhoneError(null);
      return { disabled: false };
    }
    return { disabled: true };
  };
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    props.disableCallback(phoneValidation().disabled);
  }, [
    phoneValue]);
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="phone"
      label="Phone Number"
      name="phone"
      autoComplete="phone"
      autoFocus
      onChange={(e) => setPhoneValue(e.target.value)}
      error={!!phoneError}
      helperText={phoneError}
    />
  );
}
