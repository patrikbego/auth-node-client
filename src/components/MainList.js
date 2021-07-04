import Link from 'next/link';
import React from 'react';
import DOMPurify from 'dompurify';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import utilStyles from '../styles/utils.module.css';
import DateLabel from './DateLabel';
import ReactMd from './markdownEditor/ReactMd';

export default function MainList({ postsData }) {
  const useStyles = makeStyles((theme) => ({
    p: {
      color: 'tomato',
    },

  }));
  const classes = useStyles();
  const theme = useTheme();

  if (postsData) {
    let sanitizer = (a) => a;
    if (typeof window !== 'undefined') sanitizer = DOMPurify.sanitize;
    console.log('postsData', postsData);

    return (
      <ul className={utilStyles.list}>
        {postsData.map(({
          id, createdDate, title, status,
        }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              {/* <a dangerouslySetInnerHTML={{ __html: sanitizer(htmlTitle) }} /> */}
              <a className={utilStyles.a}><ReactMd markdown={title} /></a>
            </Link>
            <small className={utilStyles.lightText}>
              <DateLabel dateString={createdDate} />
              {status === ' DRAFT' ? (
                <p className={classes.p}>{status}</p>) : (<></>)}
            </small>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className={utilStyles.list}>
      <li className={utilStyles.listItem}>
        <a>Loading ...</a>
      </li>
    </ul>
  );
}
