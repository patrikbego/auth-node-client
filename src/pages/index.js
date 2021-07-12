import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import controllers from '../api/controller';
import { errorWrapper } from '../utils/errorUtils';
import MainPanel from '../components/MainPanel';
import muiSetter from '../utils/theme';
import { useStateValue } from '../utils/reducers/StateProvider';
import GlobalAlertBar from '../components/GlobalAlertBar';

export default function Home({ appUser, postsData }) {
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);

  return (
    <>
      <ThemeProvider theme={darkLightTheme}>
        <MainPanel appUser={appUser} postsData={postsData} />
        {/* TODO: check if global alert bar is needed here */}
        <GlobalAlertBar />
      </ThemeProvider>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  let postsData = {};
  const allBlogsPromise = await controllers.getAllBlogs();
  if (allBlogsPromise.status !== 200) { // TODO extract that and add info level for 200 or 300 codes
    postsData.errors = allBlogsPromise.statusText;
  } else {
    postsData = await allBlogsPromise.json();
  }
  const appUser = errorWrapper(await controllers.getUser());
  console.info(`appUser : ${appUser.errors}`);
  return {
    props: {
      appUser,
      postsData,
    },
  };
}
