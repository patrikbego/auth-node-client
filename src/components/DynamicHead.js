import React from 'react';
import Head from 'next/head';

export default function DynamicHead({ children, meta }) {
  return (
    <Head>
      <link rel="icon" href="/alien.svg" />

      {/*// Primary Meta Tags*/}
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

      {/* <meta */}
      {/*  property="og:image" */}
      {/*  content={`https://og-image.now.sh/${encodeURI( */}
      {/*    meta.title */}
      {/*  )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`} */}
      {/* /> */}

      <meta name="twitter:card" content="summary_large_image" />
      <title>{meta.title}</title>

      // Open Graph / Facebook
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.shareUrl} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      // Twitter
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={meta.shareUrl} />
      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:image" content={meta.image} />

    </Head>
  );
}
