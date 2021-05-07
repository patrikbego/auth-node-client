import React from 'react';
import { getSortedPostsData, handleDataPromise, getPostData } from './posts';

beforeEach(() => {
  fetch.resetMocks();
});

it('tests receiving data in in a promise per post', async () => {
  const mockResponse1 = JSON.stringify({ mddata: 'test' });
  fetch.mockResponseOnce(mockResponse1);
  const response = await handleDataPromise('test.md');
  expect(response.id).toEqual('test');
});

it('tests error with rejects', () => {
  fetch.mockReject(new TypeError('fake error message'));
  return expect(handleDataPromise('test.md'))
    .rejects.toEqual(new TypeError("Cannot read property 'mddata' of undefined"));
});

it('tests get post by id', async () => {
  const mockResponse1 = JSON.stringify({ mddata: 'test' });
  fetch.mockResponseOnce(mockResponse1);
  const response = await getPostData('test');
  expect(response.id).toEqual('test');
});

it('tests error in getPostData', async () => {
  fetch.mockReject(new TypeError('fake error message'));
  expect(getPostData('test')).rejects.toEqual(new TypeError("Cannot read property 'mddata' of undefined"));
});

it('tests get all posts data', async () => {
  const mockResponse1 = JSON.stringify({
    0: 'test.md',
    1: 'test1.md',
  });
  fetch.mockResponseOnce(mockResponse1);
  const mockResponse = JSON.stringify({ mddata: 'title: "When to Use Static Generation v.s. Server-side Rendering" date: "2020-01-04"' });
  fetch.mockResponseOnce(mockResponse);
  const mockResponse2 = JSON.stringify({ mddata: 'title: "When to Use Static Generation v.s. Server-side Rendering" date: "2020-01-03"' });
  fetch.mockResponseOnce(mockResponse2);
  const response = await getSortedPostsData();
  expect(response[0].id).toEqual('test1');
});

it('tests exception thrown', async () => {
  fetch.mockReject(new Error('fake error message'));
  expect(await getSortedPostsData()).toEqual([]);
});
