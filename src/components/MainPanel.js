import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useStateValue } from '../utils/reducers/StateProvider';
import muiSetter from '../utils/theme';
import DynamicHead from './DynamicHead';
import MainLayout from './MainLayout';
import AlertBar from './AlertBar';
import GlobalAlertBar from './GlobalAlertBar';
import MainList from './MainList';

export default function MainPanel({ appUser, postsData, defMeta }) {
  const [{ token }, dispatch] = useStateValue();
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);

  // if ((appUser && appUser.errors) || (postsData && postsData.errors)) {
  //   openAlertBar(dispatch, appUser.errors + postsData.errors, 'error');
  // }

  // tokenSetter(token, dispatch, useEffect);

  const meta = {
    shareUrl: 'https://octoplasm.com',
    keywords: 'put your thoughts on online',
    description: 'put your thoughts on online ;)',
    title: 'OctoPlasm',
  };

  return (
    <>
      {/* <StrictMode> */}
      <DynamicHead meta={defMeta || meta} />
      <ThemeProvider theme={darkLightTheme}>
        <MainLayout user={appUser} mainPage>
          {appUser && appUser.errors ? (
            <AlertBar
              alertOpen
              alertMessage={appUser.errors}
              alertType="error"
            />
          ) : (<></>)}
          <GlobalAlertBar />
          {postsData && postsData.errors ? (
            <AlertBar
              alertOpen
              alertMessage={postsData.errors}
              alertType="error"
            />
          ) : (<MainList postsData={postsData} />)}
        </MainLayout>
      </ThemeProvider>
      {/* </StrictMode> */}
    </>
  );
}
