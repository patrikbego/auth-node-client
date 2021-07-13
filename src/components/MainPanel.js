import React from 'react';
import {useStateValue} from '../utils/reducers/StateProvider';
import DynamicHead from './DynamicHead';
import MainLayout from './MainLayout';
import AlertBar from './AlertBar';
import MainList from './MainList';

export default function MainPanel({ appUser, postsData, defMeta }) {
  const [{ user, token }, dispatch] = useStateValue();

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
      <MainLayout user={appUser} mainPage token={token}>
        {appUser && appUser.errors ? (
          <AlertBar
            alertOpen
            alertMessage={appUser.errors}
            alertType="error"
          />
        ) : (<></>)}

        {postsData && postsData.errors ? (
          <AlertBar
            alertOpen
            alertMessage={postsData.errors}
            alertType="error"
          />
        ) : (<MainList postsData={postsData} />)}
      </MainLayout>
      {/* </StrictMode> */}
    </>
  );
}
