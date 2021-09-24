import React from 'react';
import { render } from '@testing-library/react';
import SharePanel from './SharePanel';

const mockData = {
  mddata: 'test',
  meta: {
    title: 'fileName',
    description: 'test description',
    keywords: 'NI at the moment',
    image: '/images/profile.jpg',
  },
};

it('renders mainList component correctly', () => {
  const tree = render(<SharePanel postData={mockData} />);
  expect(tree).toMatchSnapshot();

  // expect(
  //   tree.getAllByRole('button', {'aria-label': '[facebook]'})
  // ).toBeInTheDocument();
});

it('renders mainList component in-correctly', () => {
  expect(() => {
    render(<SharePanel />);
  }).toThrow("Cannot read property 'title' of undefined");
});
