import React, { StrictMode, useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import BlogAddEdit from '../../components/BlogAddEdit';
import { useStateValue } from '../../utils/reducers/StateProvider';
import controllers from '../../api/controller';
import AlertBar from '../../components/AlertBar';
import muiSetter from '../../utils/theme';
import { tokenSetter } from '../../utils/tokenUtils';

export default function blog({ content, appUser }) {
  const { darkLightTheme } = muiSetter(useStateValue, createMuiTheme);
  const [{ token }, dispatch] = useStateValue();
  // tokenSetter(token, dispatch, useEffect);

  return (
    <>
      <StrictMode>
        <ThemeProvider theme={darkLightTheme}>
          <CssBaseline />
          <AlertBar />
          <BlogAddEdit content={content} />
        </ThemeProvider>
      </StrictMode>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  // TODO get user from JWT on server side ?!?
  const appUser = await controllers.getUser();
  let content = {};
  content.body = '\n'
      + '\n'
      + '# Heading level 1\n'
      + '\n'
      + '\n'
      + '...\n'
      + '\n'
      + '###### Heading level 6\n'
      + '\n'
      + 'Heading level 1\n'
      + '===============\n'
      + '\n'
      + '\n'
      + 'Heading level 2\n'
      + '---------------\n'
      + '\n'
      + '## Here\'s a Heading\n'
      + '\n'
      + '\n'
      + '#Here\'s a Heading\n'
      + '\n'
      + 'To create paragraphs, use a blank line to   \n'
      + '\n'
      + 'separate one or more lines of text.\n'
      + '\n'
      + 'To create a line break (<br>), end a line with two or more spaces, and then type return.\n'
      + '\n'
      + '**bold text**.  \n'
      + '__bold text__\n'
      + '\n'
      + '*italic text*.  \n'
      + '_italic_text. \n'
      + 'A*cat*meow\n'
      + '\n'
      + 'This text is ___really important___.\n'
      + '\n'
      + '> To create a blockquote, add a > in front of a paragraph.  \n'
      + '\n'
      + '> Blockquotes can contain multiple paragraphs. \n'
      + '>\n'
      + '> Add a > on the blank lines between the paragraphs.\n'
      + '\n'
      + '\n'
      + '> Blockquotes can be nested.\n'
      + '>> Add a >> in front of the paragraph you want to nest.\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '> #### Mixed Example\n'
      + '>\n'
      + '> - Blockquotes can have all sort of elements\n'
      + '> - Profits were higher than ever.\n'
      + '>\n'
      + '>  *Italic* or **bold**.\n'
      + '\n'
      + '1. First item\n'
      + '2. Second item\n'
      + '3. Third item\n'
      + '4. Fourth item\n'
      + '---\n'
      + '1. First item\n'
      + '1. Second item\n'
      + '1. Third item\n'
      + '1. Fourth item\n'
      + '---\n'
      + '1. First item\n'
      + '2. Second item\n'
      + '3. Third item\n'
      + '    1. Indented item\n'
      + '    2. Indented item\n'
      + '4. Fourth item\n'
      + '---\n'
      + '- First item\n'
      + '- Second item\n'
      + '- Third item\n'
      + '- Fourth item\n'
      + '\n'
      + '![Tux, the Linux mascot](https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg)\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '1. First item\n'
      + '2. Second item\n'
      + '3. Third item\n'
      + '    - Indented item\n'
      + '    - Indented item\n'
      + '4. Fourth item\n'
      + '\n'
      + '\n'
      + '\n'
      + '***\n'
      + '---\n'
      + '_________________\n'
      + '\n'
      + '\n'
      + 'My favorite search engine is [Duck Duck Go](https://duckduckgo.com).\n'
      + '\n'
      + '<https://www.markdownguide.org>\n'
      + '<fake@example.com>\n'
      + '\n'
      + '<h2>An Unordered HTML List</h2>\n'
      + '\n'
      + '<ul>\n'
      + '  <li>Coffee</li>\n'
      + '  <li>Tea</li>\n'
      + '  <li>Milk</li>\n'
      + '</ul>  \n'
      + '\n'
      + '<h2>An Ordered HTML List</h2>\n'
      + '\n'
      + '<ol>\n'
      + '  <li>Coffee</li>\n'
      + '  <li>Tea</li>\n'
      + '  <li>Milk</li>\n'
      + '</ol> \n'
      + '\n'
      + '```\n'
      + 'let {this is / special block}\n'
      + '<every character> is allowed here\n'
      + '```\n';
  // Here we are getting user from server (just as an example of prerendering).
  // Actually we should get user from token
  console.log('we are inside', params, params.id !== '0');
  if (params && params.id && params.id !== '0') {
    const postData = await controllers.getBlog(params.id);
    content = postData;
    // const blogger = await getUserData('patrik.bego'); // TODO hard coded for now
  }
  console.log(content);
  return {
    props: {
      content,
      appUser,
    },
  };
}
