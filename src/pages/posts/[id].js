import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import PostLayout from '../../components/oldPosts/postLayout';
import DateLabel from '../../components/oldPosts/dateLabel';
import utilStyles from '../../styles/utils.module.css';
import ShareFooter from '../../components/oldPosts/shareFooter';
import markdownStyle from './markdown.module.css';
import controllers from '../../api/controller';
import { useStateValue } from '../../utils/reducers/StateProvider';

export default function Post({ postData, shareUrl }) {
  (function () {
    console.log(
      `typeof window !== 'undefined' ${typeof window !== 'undefined'}`,
    );
    if (typeof window !== 'undefined') {
      shareUrl = window.location.href;
      console.log(`shareUrl = window.location.href;  ${shareUrl}`);
      console.log(`shareUrl = window.location.href;  ${Date.now()}`);
    }
  }());
  const windowFunc = function () {
    console.log(`typeof window !== 'undefined' windowFunc ${
      typeof window !== 'undefined'}`);
    if (typeof window !== 'undefined') {
      shareUrl = window.location.href;
      console.log(`shareUrl = window.location.href;  windowFunc ${shareUrl}`);
      console.log(`shareUrl = window.location.href;  windowFunc ${Date.now()}`);
    }
  };
  useEffect(() => {
    // this.setState({shareUrl: window.location.href})
    shareUrl = window.location.href;
    console.log(`shareUrl = window.location.href ${shareUrl}`);
    console.log(`shareUrl = window.location.href ${Date.now()}`);
  });
  console.log(`component render: ${Date.now()}`);
  const [share, setShare] = useState();
  useEffect(() => {
    async function loadTodos() {
      setShare(window.location.href);
    }

    loadTodos();
  }, []);

  const [{ user, token, theme }, dispatch] = useStateValue();
  return (
    <PostLayout user={user} postData={postData} shareUrl={share}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={markdownStyle.markdown_body}>
        {/* {shareUrl}{todos} */}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateLabel dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.body }} />
      </article>
      <ShareFooter postData={postData} shareUrl={share} />
    </PostLayout>
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
