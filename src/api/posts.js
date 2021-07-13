import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import { openAlertBar } from '../utils/alertBarUtils';
import controllers from './controller';
import { parseTitle } from '../utils/metaUtils';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_REST_API}/api/v1/blog`;

export async function handleDataPromise(fileName) {
  const id = fileName.replace(/\.md$/, '');
  let data;
  try {
    const res = await fetch(`${API_BASE_URL}/${id}.md`);
    data = await res.json();
  } catch (err) {
    console.log(err);
  }

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(data.mddata);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}

export async function getSortedPostsData() {
  let fileNames;
  try {
    const res = await fetch(`${API_BASE_URL}/getBlogs`);
    fileNames = await res.json();
    console.log(`fileNames: ${fileNames}`);
  } catch (err) {
    console.log(err);
  }

  const postsData = [];

  for (const key in fileNames) {
    if (fileNames.hasOwnProperty(key)) {
      console.log(`${key} -> ${fileNames[key]}`);
      postsData.push(await handleDataPromise(fileNames[key]));
    }
  }

  // Sort posts by date
  return postsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export async function getPostData(id) {
  let data;
  try {
    const res = await fetch(`${API_BASE_URL}/${id}.md`);
    data = await res.json();
  } catch (e) {
    console.log(e);
  }
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(data.mddata);
  const { meta } = data;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    meta,
    contentHtml,
    ...matterResult.data,
  };
}

export function handleAddUpdate(content, setOpen, dispatch, tags, publish, itemId, userId) {
  if (!content) {
    setOpen(false);
    console.log('content is required');
    openAlertBar(dispatch, 'Content is required!', 'error');
    return;
  }
  const articleTitle = content.split('\n')[0];
  if (articleTitle && !articleTitle.includes('#')) {
    setOpen(false);
    console.log('Title is required');
    openAlertBar(dispatch, 'Title is required!', 'error');
    return;
  }
  const blog = {
    // userId: , parsed from cookie on the server
    language: 'EN',
    original: 'EN',
    title: articleTitle,
    body: content,
    userId,
    tags,
    published: !!publish,
    status: publish ? 'PUBLISHED' : 'DRAFT',
  };
  if (!itemId) {
    blog.createdDate = new Date();
    controllers.createBlog(blog).then(async (res) => {
      setOpen(false);
      const data = await res.json();
      if (res.status !== 200) { // TODO extract that and add info level for 200 or 300 codes
        openAlertBar(dispatch, data, 'error');
      } else {
        openAlertBar(dispatch, 'Article has been created!', 'success');
      }
    });
  } else {
    blog.updatedDate = new Date();
    blog.id = itemId;
    controllers.updateBlog(blog).then((res) => {
      setOpen(false);
      if (res.status !== 200) { // TODO extract that and add info level for 200 or 300 codes
        openAlertBar(dispatch, res.statusText, 'error');
      } else {
        openAlertBar(dispatch, 'Article has been updated!', 'success');
      }
    });
  }
}

export function handleDelete(postId, dispatch) {
  controllers.deleteBlog({ id: postId.itemId }).then((res) => {
    if (res.status !== 200) { // TODO extract that and add info level for 200 or 300 codes
      openAlertBar(dispatch, res.statusText, 'error');
    } else {
      openAlertBar(dispatch, 'Article has been Deleted!', 'success');
    }
  });
}
