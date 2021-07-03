import React, { StrictMode } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import controllers from '../../api/controller';
import MainLayout from '../../components/MainLayout';
import { useStateValue } from '../../utils/reducers/StateProvider';
import MainList from '../../components/MainList';
import GlobalAlertBar from '../../components/GlobalAlertBar';
import muiSetter from '../../utils/theme';
import DynamicHead from '../../components/DynamicHead';
import { errorWrapper } from '../../utils/errorUtils';
import AlertBar from '../../components/AlertBar';
import { openAlertBar } from '../../utils/alertBarUtils';

export default function Home({ appUser, postsData }) {
  const [{ token }, dispatch] = useStateValue();
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);

  // if ((appUser && appUser.errors) || (postsData && postsData.errors)) {
  //   openAlertBar(dispatch, appUser.errors + postsData.errors, 'error');
  // }

  // tokenSetter(token, dispatch, useEffect);

  const meta = {
    shareUrl: 'https://octoplasm.com',
    keywords: 'time to put your mind on paper',
    description: 'Life can be simple, why complicate it ;)',
    title: 'OctoPlasm',
  };

  return (
    <>
      {/* <StrictMode> */}
      <DynamicHead meta={meta} />
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

export async function getServerSideProps({ params, req }) {
  let postsData = {};
  // controllers.getUserDraftBlogs(params.id, req).then((res) => {
  const allBlogsPromise = await controllers.getUserBlogs(params.id);
  if (allBlogsPromise.status !== 200) { // TODO extract that and add info level for 200 or 300 codes
    postsData.errors = allBlogsPromise.statusText;
  } else {
    postsData = await allBlogsPromise.json();
    console.log(postsData);
  }

  // postsData = await Promise.all(crudPostData.map(async ({ id, createdDate, title }) => {
  //   console.log(createdDate);
  //   const htmlTitle = await mdToHtml(title);
  //   return { id, createdDate, htmlTitle };
  // }));
  // Here we are getting user from server (just as an example of prerendering).
  // Actually we should get user from token
  const appUser = errorWrapper(await controllers.getUser());
  console.log(`appUser : ${appUser.errors}`);
  return {
    props: {
      appUser,
      postsData,
    },
  };
}
