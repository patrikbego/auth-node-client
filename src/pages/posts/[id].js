import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  useTheme,
} from '@material-ui/core/styles';
import DateLabel from '../../components/DateLabel';
import utilStyles from '../../styles/utils.module.css';
import ShareFooter from '../../components/ShareFooter';
import markdownStyle from './markdown.module.css';
import controllers from '../../api/controller';
import { useStateValue } from '../../utils/reducers/StateProvider';
import MainLayout from '../../components/MainLayout';
import GlobalAlertBar from '../../components/GlobalAlertBar';
import muiSetter from '../../utils/theme';
import mdToHtml from '../../utils/mdUtils';
import DynamicHead from '../../components/DynamicHead';
import { parseMetaData, parseTitle } from '../../utils/metaUtils';
import ReactMd from '../../components/markdownEditor/ReactMd';

export default function Post({ postData, shareUrl }) {
  (function () {
    console.log(
      `typeof window !== 'undefined' ${typeof window !== 'undefined' && typeof window.location !== 'undefined'}`,
    );
    if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
      shareUrl = window.location.href;
      console.log(`shareUrl = window.location.href;  ${shareUrl}`);
      console.log(`shareUrl = window.location.href;  ${Date.now()}`);
    }
  }());
  const windowFunc = function () {
    console.log(`typeof window !== 'undefined' windowFunc ${
      typeof window !== 'undefined' && typeof window.location !== 'undefined'}`);
    if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
      shareUrl = window.location.href;
      console.log(`shareUrl = window.location.href;  windowFunc ${shareUrl}`);
      console.log(`shareUrl = window.location.href;  windowFunc ${Date.now()}`);
    }
  };
  useEffect(() => {
    // this.setState({shareUrl: window.location.href})
    if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
      shareUrl = window.location.href;
    }
    console.log(`shareUrl = window.location.href ${shareUrl}`);
    console.log(`shareUrl = window.location.href ${Date.now()}`);
  });
  console.log(`component render: ${Date.now()}`);
  const [share, setShare] = useState();
  useEffect(() => {
    async function loadTodos() {
      if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
        setShare(window.location.href);
      }
    }

    loadTodos();
  }, []);
  let sanitizer = (a) => a;
  if (typeof window !== 'undefined') sanitizer = DOMPurify.sanitize;
  const [{ user, token, theme }, dispatch] = useStateValue();
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);
  // tokenSetter(token, dispatch, useEffect);
  const [htmlContent, setHtmlContent] = useState();

  mdToHtml(postData.body).then((e) => {
    e = `${'<style>\n'
    + '  h1 {color:red;}\n'
    + '  p {color:blue;}\n'
    + '  img {width:50%;}\n'
    + '</style>'}${e}`;

    setHtmlContent(e);
  });

  console.log('theme ====== ', theme);
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
    },
    mdContent: {
      color:
          theme
            ? 'tomato'
            : 'black',
    },

  }));

  const classes = useStyles(theme);

  return (
    <>
      {/* <StrictMode> */}
      <DynamicHead meta={parseMetaData(postData.body, shareUrl)} />
      <ThemeProvider theme={darkLightTheme}>
        <MainLayout user={user} itemId={postData.id}>
          <GlobalAlertBar />
          <Head>
            <title>{parseTitle(postData.title)}</title>
          </Head>
          <article className={markdownStyle.markdown_body}>
            {/* {shareUrl}{todos} */}
            {/* <h1 className={utilStyles.headingXl}>{postData.body.split('\n')[0]}</h1> */}
            <div className={utilStyles.lightText}>
              <DateLabel dateString={postData.createdDate} />
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
            <ReactMd cssClass={classes.mdContent} markdown={postData.body} />
          </article>
          <br />
          {' '}
          <br />
          {' '}
          <br />
          <ShareFooter postData={parseMetaData(postData.body, shareUrl)} shareUrl={share} />
        </MainLayout>
      </ThemeProvider>
      {/* </StrictMode> */}
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  console.log(`params: ${params}`);
  const postData = await controllers.getBlog(params.id);
  // const blogger = await getUserData('patrik.bego'); // TODO hard coded for now
  return {
    props: {
      postData,
      // blogger,
    },
  };
}
