import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import os from 'os';
import controllers from '../../api/controller';
import { errorWrapper } from '../../utils/errorUtils';
import MainPanel from '../../components/MainPanel';
import muiSetter from '../../utils/theme';
import { useStateValue } from '../../utils/reducers/StateProvider';
import { extractTokenFromHeaders, tokenSetter } from '../../utils/tokenUtils';

require('log-timestamp');

export default function Home({ appUser, postsData, token }) {
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);
  const [{ }, dispatch] = useStateValue();
  tokenSetter(token, dispatch, useEffect);
  return (
    <>
      <ThemeProvider theme={darkLightTheme}>
        <MainPanel appUser={appUser} postsData={postsData} />
      </ThemeProvider>
    </>

  );
}

export async function getServerSideProps(context) {
  let token = null;
  let postsData = {};
  const headers = context.req ? context.req.headers : undefined;
  if (headers) {
    token = extractTokenFromHeaders(headers);
  }

  console.debug('getServerSideProps HOST =>', context.req.host);
  const hostname = os.hostname();
  console.debug('getServerSideProps HOST =>', hostname);

  const userDraftBlogs = await controllers.getUserDraftBlogs(context.params.username.trim(), context.req, token);
  console.debug('drafts username = ', context.params.username);
  if (userDraftBlogs.status !== 200) { // TODO extract that and add info level for 200 or 300 codes
    console.error('drafts ->', context.params.username, ' error is ', userDraftBlogs.status, userDraftBlogs.statusText);
    postsData.errors = userDraftBlogs.statusText;
  } else {
    postsData = await userDraftBlogs.json();
  }

  const appUser = errorWrapper(await controllers.getUser());
  console.info(`appUser : ${appUser.errors}`);
  return {
    props: {
      appUser,
      postsData,
      token,
    },
  };
}
