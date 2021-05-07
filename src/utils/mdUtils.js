import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

export default async function mdToHtml(mdContent) {
  const matterResult = matter(mdContent);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return contentHtml;
}
