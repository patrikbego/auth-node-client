import React from 'react';
import { render, screen } from '@testing-library/react';
import DateC from './dateLabel';

it('renders date component correctly', () => {
  const tree = render(<DateC dateString="2020-01-01" />);
  expect(tree).toMatchSnapshot();
});

it('checks the date string is in right format', () => {
  try {
    render(<DateC dateString="05 October 2011 14:48 UTC" />);
  } catch (e) {
    if (e instanceof RangeError) {
      console.log('RangeError caught in test');
    } else {
      throw e;
    }
    expect(e.message).toBe('Invalid time value');
  }
});

it('checks full date', () => {
  const tree = render(<DateC dateString="2021-05-06 01:35:34.242+00" />);
  expect(tree).toMatchSnapshot();
  expect(
    screen.getByText('Wed May 05 2021'),
  ).toBeInTheDocument();
});
//
// it('checks the date string is in right format 1', () => {
//   expect(() => {
//     render(<DateC dateString="123123123123123123" />);
//   }).toBe('[Function anonymous]');
// });
