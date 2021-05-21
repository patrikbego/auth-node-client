import React, { StrictMode } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SignUp from '../components/SignUp';
import Header from '../components/Header';
import muiSetter from '../utils/theme';
import { useStateValue } from '../utils/reducers/StateProvider';

export default function SignUpP() {
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);
  return (
    <>
      <StrictMode>
        <ThemeProvider theme={darkLightTheme}>
          <Header loading={false} />
          <SignUp />
        </ThemeProvider>
      </StrictMode>
    </>
  );
}
