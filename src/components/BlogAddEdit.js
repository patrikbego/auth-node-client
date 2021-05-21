import React from 'react';
import MarkdownEditor from './markdownEditor/EditorPage';

export default function BlogAddEdit({ content }) {
  // const [value, setValue] = React.useState('**Hello world!!!**');
  return (
    <div>
      <MarkdownEditor content={content} />
    </div>
  );
}
