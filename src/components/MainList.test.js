import React from 'react';
import { render, screen } from '@testing-library/react';
import MainList from './MainList';

it('renders empty mainList component correctly', () => {
  const tree = render(<MainList list />);
  expect(tree).toMatchSnapshot();

  expect(
    screen.getByText('Loading ...'),
  ).toBeInTheDocument();
});

it('renders mainList component correctly', () => {
  const list1 = [{ id: 'test.md', createdDate: '2021-05-06', title: 'test' }];
  const tree = render(<MainList postsData={list1} />);
  expect(tree).toMatchSnapshot();

  expect(
    screen.getByText('Thu May 06 2021'),
  ).toBeInTheDocument();
});
