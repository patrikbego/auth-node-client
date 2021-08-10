import React, { } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from '../../components/Header';
import muiSetter from '../../utils/theme';
import { useStateValue } from '../../utils/reducers/StateProvider';

export default function SignUpP() {
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);
  return (
    <>
      <ThemeProvider theme={darkLightTheme}>
        <Header loading={false} />
      </ThemeProvider>
    </>
  );
}
