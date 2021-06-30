import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';

export default function TextFieldRequired(disableCallback, fieldProps) {
  const firstRender = useRef(true);

  const { requiredText, label, field } = disableCallback.fieldProps;

  const [textField, setTextField] = useState('');
  const [textError, setTextError] = useState(null);

  const textValidation = () => {
    console.log('formValidation');
    setTextError(null);

    let valid = true;
    if (!textField) {
      setTextError(
        requiredText,
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
    disableCallback.disableCallback(textValidation().disabled);
  }, [
    textField]);

  return (
    <TextField
      variant="outlined"
      required
      fullWidth
      id={field}
      label={label}
      name={field}
      autoComplete={field}
      onChange={(e) => setTextField(e.target.value)}
      error={!!textError}
      helperText={textError}
    />
  );
}
