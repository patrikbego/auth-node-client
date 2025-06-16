import React from 'react';
import { render, screen } from '@testing-library/react';
import MainList from './MainList';

it('renders empty mainList component correctly', () => {
  render(<MainList list />);

  expect(
    screen.getByText('Loading ...'),
  ).toBeInTheDocument();
});

it('renders mainList component correctly', () => {
  const list1 = [{ id: 'test.md', createdDate: '2021-05-06', title: 'test' }];
  render(<MainList postsData={list1} />);

  expect(
    screen.getByText('Thu May 06 2021'),
  ).toBeInTheDocument();
});
