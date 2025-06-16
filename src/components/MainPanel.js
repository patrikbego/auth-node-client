import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStateValue } from '../utils/reducers/StateProvider';
import DynamicHead from './DynamicHead';
import MainLayout from './MainLayout';
import AlertBar from './AlertBar';
import MainList from './MainList';

export default function MainPanel({ appUser, postsData, defMeta }) {
  const [{ user, token }, dispatch] = useStateValue();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.tag || '');
  useEffect(() => {
    if (router.query.tag) setSearchTerm(router.query.tag);
  }, [router.query.tag]);
  // if ((appUser && appUser.errors) || (postsData && postsData.errors)) {
  //   openAlertBar(dispatch, appUser.errors + postsData.errors, 'error');
  // }

  // tokenSetter(token, dispatch, useEffect);

  const meta = {
    shareUrl: 'https://octoplasm.com',
    keywords: 'Put Your Thoughts Online',
    description: 'Put Your Thoughts Online ;)',
    title: 'OctoPlasm',
  };

  const filteredPosts = postsData && Array.isArray(postsData)
    ? postsData.filter(({ title, tags }) => title.toLowerCase().includes(searchTerm.toLowerCase())
          || (tags && tags.toLowerCase().includes(searchTerm.toLowerCase())))
    : postsData;

  return (
    <>
      {/* <StrictMode> */}
      <DynamicHead meta={defMeta || meta} />
      <MainLayout
        user={appUser}
        mainPage
        token={token}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      >
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
        ) : (
          <MainList postsData={filteredPosts} />
        )}
      </MainLayout>
      {/* </StrictMode> */}
    </>
  );
}
