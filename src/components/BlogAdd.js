import React from 'react';
import MarkdownEditor from './MarkdownEditor/EditorPage';

export default function BlogAdd({ content }) {
  // const [value, setValue] = React.useState('**Hello world!!!**');
  return (
    <div>
      <MarkdownEditor content={content} />
    </div>
  );
}
