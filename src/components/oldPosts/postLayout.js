import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import styles from './postLayout.module.css';
import utilStyles from '../../styles/utils.module.css';
import DynamicHead from './dynamicHead';
import ImageComponent from './ImageComponent';

export default function PostLayout({
  children,
  user: blogger,
  postData,
  shareUrl = 'https://bego.tips',
}) {
  console.log(`PostLayout ${shareUrl}`);
  postData.shareUrl = shareUrl;
  return (
    <div className={styles.container}>
      <DynamicHead meta={postData} />
      <header className={styles.header}>
        <>
          <Link href="/">
            <a>
              <ImageComponent imageMeta={{
                src: `/c_scale,w_1000/v1609682293/bego.tips/${postData.image}`,
                alt: 'Image does not exist',
              }}
              />
              {/* <Image */}
              {/*  alt={blogger.name} */}
              {/*  src={'/c_scale,w_1000/v1609682293/bego.tips/' + postData.meta.image} */}
              {/*  layout="intrinsic" */}
              {/*  width={500} */}
              {/*  height={500} */}
              {/* /> */}
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>Bego Tips</a>
            </Link>
          </h2>
        </>
      </header>
      <main>{children}</main>
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    </div>
  );
}
