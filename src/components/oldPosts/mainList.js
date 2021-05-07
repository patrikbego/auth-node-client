import Link from 'next/link';
import React from 'react';
import utilStyles from '../../styles/utils.module.css';
import DateLabel from './dateLabel';

export default function MainList({ postsData }) {
  if (postsData) {
    return (
      <ul className={utilStyles.list}>
        {postsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <DateLabel dateString={date} />
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
