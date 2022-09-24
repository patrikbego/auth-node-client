import React from 'react';
import { render } from '@testing-library/react';
import PrivacyPopUp from './PrivacyPopUp';

it('renders empty PrivacyPopUp component correctly', () => {
  const tree = render(<PrivacyPopUp />);
  expect(tree).toMatchSnapshot();
});
