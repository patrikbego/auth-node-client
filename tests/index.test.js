import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/pages/index';
import {
  StateProvider,
} from '../src/utils/reducers/StateProvider';
import reducer, { initialState } from '../src/utils/reducers/reducer';

const user = {
  name: 'Patrik', surname: 'Test', about: 'Philosopher|Entrepreneur|Code and Life hacker', siteTitle: 'My new blog',
};

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));
describe('App', () => {
  it('renders empty list without crashing', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>,
    );
    expect(
      screen.getByText('Loading ...'),
    ).toBeInTheDocument();
  });
});
