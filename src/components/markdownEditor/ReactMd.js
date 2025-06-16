import React from 'react';

const ReactMarkdown = require('react-markdown');
const gfm = require('remark-gfm');

export default function ReactMd({ markdown, cssClass }) {
  return (
    <>
      <ReactMarkdown className={cssClass} remarkPlugins={[gfm]} children={markdown} />
    </>
  );
}
