import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';

export default function TextFieldRequired(disableCallback, fieldProps) {
  const firstRender = useRef(true);

  const [textField, setTextField] = useState('');
  const [textError, setTextError] = useState(null);

  const phoneValidation = () => {
    console.log('formValidation');
    setTextError(null);

    let valid = true;
    if (!textField) {
      setTextError(
        fieldProps.requiredText,
      );
      valid = false;
    }

    if (valid) {
      setTextError(null);
      return { disabled: false };
    }
    return { disabled: true };
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    disableCallback.disableCallback(phoneValidation().disabled);
  }, [
    textField]);

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
    // id={fieldProps.field}
      label="{fieldProps.label}"
    // name={fieldProps.field}
    // autoComplete={fieldProps.field}
      autoFocus
      onChange={(e) => setTextField(e.target.value)}
      error={!!textError}
      helperText={textError}
    />
  );
}
