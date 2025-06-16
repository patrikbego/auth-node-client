import Link from 'next/link';
import React from 'react';
import DOMPurify from 'dompurify';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import utilStyles from '../styles/utils.module.css';
import DateLabel from './DateLabel';
import ReactMd from './markdownEditor/ReactMd';

export default function MainList({ postsData }) {
  const useStyles = makeStyles((defTheme) => ({
    p: {
      color: '#f26b5c',
    },

    h1: {
      color: '#f26b5c',
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

    card: {
      height: '100%',
    },
    gridContainer: {
      marginTop: defTheme.spacing(2),
    },
    cardContent: {
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
    tags: {
      marginTop: defTheme.spacing(1),
      '& a': {
        marginRight: defTheme.spacing(1),
      },
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
          {/* <h1 className={classes.h1}>OctoPlasm</h1> */}
          {/* <h6 className={classes.h6}>Easy Way to Share Your Ideas</h6> */}
          {/* <Divider className={classes.divider}/> */}
        </div>
        <Grid container spacing={2} className={classes.gridContainer}>
          {postsData.map(({
            id, createdDate, title, status, tags,
          }) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <Card className={classes.card}>
                <Link href="/posts/[id]" as={`/posts/${id}`} passHref>
                  <CardActionArea component="a">
                    <CardContent className={classes.cardContent}>
                      <Typography component="div">
                        <ReactMd markdown={title} />
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <DateLabel dateString={createdDate} />
                      </Typography>
                      {tags && (
                      <Typography variant="body2" className={classes.tags}>
                        {tags.split(/\s+/).map((tag) => (
                          <Link
                            href={`/?tag=${encodeURIComponent(tag)}`}
                            key={tag}
                          >
                            <a className={utilStyles.tagLink}>{tag}</a>
                          </Link>
                        ))}
                      </Typography>
                      )}
                      {status === ' DRAFT' ? (
                        <Typography variant="body2" className={classes.p}>
                          {status}
                        </Typography>
                      ) : null}
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
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
