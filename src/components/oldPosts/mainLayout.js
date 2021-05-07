import React from 'react';
import styles from './mainLayout.module.css';
import utilStyles from '../../styles/utils.module.css';
import * as gtag from './gtag';
import DynamicHead from './dynamicHead';
import ImageComponent from './ImageComponent';

export default function MainLayout({ children, home }) {
  if (process.browser) { // typeof children === 'undefined' -> we dont want to run it in test
    gtag.event({
      action: 'main_layout',
      category: 'landing_page',
      label: 'landing_page',
    });
  }

  const meta = {
    shareUrl: 'https://bego.tips',
    keywords: 'about code and life hacking',
    description: 'Life can be simple, why complicate it (same goes for code) ;)',
    title: 'My New Blog',
  };

  return (
    <div className={styles.container}>
      <DynamicHead meta={meta} />
      <header className={styles.header}>
        <>
          <ImageComponent imageMeta={{
            src: '/c_scale,w_1000/v1609682293/bego.tips/m2qslhvogfi7wqbbwopz.webp',
            alt: 'bego.tips',
          }}
          />
          <h1 className={utilStyles.heading2Xl}>Bego Tips</h1>
        </>
      </header>
      <main>{children}</main>
    </div>
  );
}
