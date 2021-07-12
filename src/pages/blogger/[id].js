import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import controllers from '../../api/controller';
import { errorWrapper } from '../../utils/errorUtils';
import MainPanel from '../../components/MainPanel';
import muiSetter from '../../utils/theme';
import { useStateValue } from '../../utils/reducers/StateProvider';

export default function Home({ appUser, postsData }) {
  const meta = {
    shareUrl: 'https://octoplasm.com', // TODO setup right url
    keywords: 'time to put your mind on paper',
    description: 'Life can be simple, why complicate it ;)',
    title: 'OctoPlasm',
  };

  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);

  return (
    <>
      <ThemeProvider theme={darkLightTheme}>
        <MainPanel appUser={appUser} postsData={postsData} defMeta={meta} />
      </ThemeProvider>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  let postsData = {};
  const allBlogsPromise = await controllers.getUserBlogs(params.id);
  if (allBlogsPromise.status !== 200) { // TODO extract that and add info level for 200 or 300 codes
    postsData.errors = allBlogsPromise.statusText;
  } else {
    postsData = await allBlogsPromise.json();
  }
  const appUser = errorWrapper(await controllers.getUser());
  console.debug(`appUser : ${appUser.errors}`);
  return {
    props: {
      appUser,
      postsData,
    },
  };
}
