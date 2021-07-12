import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';

export default function Phone({disableCallback, user}) {
  const firstRender = useRef(true);

  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState(null);

  const phoneValidation = () => {
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
    disableCallback(phoneValidation().disabled);
  }, [
    phoneValue]);

  let labelText = user ? user.phone : 'Phone Number';
  return (
    <TextField
      variant="outlined"
      required
      fullWidth
      id="phone"
      label={labelText}
      name="phone"
      autoComplete="phone"
      onChange={(e) => setPhoneValue(e.target.value)}
      error={!!phoneError}
      helperText={phoneError}
    />
  );
}
