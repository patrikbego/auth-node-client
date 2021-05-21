import React, { useEffect, StrictMode } from 'react';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import controllers from '../api/controller';
import MainLayout from '../components/MainLayout';
import {
  useStateValue,
} from '../utils/reducers/StateProvider';
import MainList from '../components/MainList';
import AlertBar from '../components/AlertBar';
import muiSetter from '../utils/theme';
import mdToHtml from '../utils/mdUtils';
import DynamicHead from '../components/DynamicHead';
import { tokenSetter, validateJwt } from '../utils/tokenUtils';

export default function Home({ items, appUser, postsData }) {
  const [{ token }, dispatch] = useStateValue();
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);

  // tokenSetter(token, dispatch, useEffect);

  const meta = {
    shareUrl: 'https://bego.tips',
    keywords: 'about code and life hacking',
    description: 'Life can be simple, why complicate it (same goes for code) ;)',
    title: 'My New Blog',
  };

  return (
    <>
      <StrictMode>
        <DynamicHead meta={meta} />
        <ThemeProvider theme={darkLightTheme}>
          <MainLayout items={items} user={appUser} mainPage>
            <AlertBar />
            <MainList postsData={postsData} />
          </MainLayout>
        </ThemeProvider>
      </StrictMode>
    </>
  );
}

export async function getServerSideProps() {
  console.log('controllers.url()', controllers.url());
  console.log('URL', URL);
  console.log('controllers.url', controllers.URL);
  console.log('process.env.NEXT_PUBLIC_REST_API', process.env.NEXT_PUBLIC_REST_API);
  console.log('process.env.NEXT_PUBLIC_REST_API1', process.env.NEXT_PUBLIC_REST_API);
  console.log('process.env.envNameEnv', process.env.envNameEnv);
  console.log('process.env.restApiEnv', process.env.restApiEnv);
  console.log('process.env.NEXT_PUBLIC_ENV_NAME', process.env.NEXT_PUBLIC_ENV_NAME);
  console.log('process.env.NEXT_PUBLIC_ENV_NAME1', process.env.NEXT_PUBLIC_ENV_NAME);

  const items = await controllers.getItems();
  const crudPostData = await controllers.getBlogs();
  let postsData = crudPostData;
  // postsData = await Promise.all(crudPostData.map(async ({ id, createdDate, title }) => {
  //   console.log(createdDate);
  //   const htmlTitle = await mdToHtml(title);
  //   return { id, createdDate, htmlTitle };
  // }));
  // Here we are getting user from server (just as an example of prerendering).
  // Actually we should get user from token
  const appUser = await controllers.getUser();
  return {
    props: {
      items,
      appUser,
      postsData,
    },
  };
}
