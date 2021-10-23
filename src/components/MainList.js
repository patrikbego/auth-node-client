import Link from 'next/link';
import React from 'react';
import DOMPurify from 'dompurify';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import utilStyles from '../styles/utils.module.css';
import DateLabel from './DateLabel';
import ReactMd from './markdownEditor/ReactMd';

export default function MainList({ postsData }) {
  const useStyles = makeStyles((defTheme) => ({
    p: {
      color: 'tomato',
    },

    h1: {
      color: 'tomato',
      padding: '0VW 10VW 0VW 10VW',
    },

    h6: {
      marginTop: '-16px',
    },

    top: {
      padding: '1rem',
    },

    divider: {
      // display: 'flex',
      // width: '200%',
      // textAlign: 'center',
    },

    hr: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '40%',

    },

    left: {
      float: 'left',
    },

    right: {
      float: 'right',
    },

  }));
  const classes = useStyles();
  const defMaterialTheme = useTheme();

  if (postsData) {
    let sanitizer = (a) => a;
    if (typeof window !== 'undefined') sanitizer = DOMPurify.sanitize;

    return (
      <>
        <div className={classes.top}>
          <h1 className={classes.h1}>OctoPlasm</h1>
          <h6 className={classes.h6}>Easy Way to Share Your Ideas</h6>
          <Divider className={classes.divider}/>
        </div>
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
      </>
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
