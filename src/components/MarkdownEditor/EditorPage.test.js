import React from 'react';
import ReactDOM from 'react-dom';
import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import AddPanel from './EditorPanel';
import { StateProvider } from '../../utils/reducers/StateProvider';
import reducer, { initialState } from '../../utils/reducers/reducer';
import ReactDom from 'react-dom';

// https://github.com/mrdulin/react-act-examples/blob/master/sync.md
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
it('renders editor panel correctly', async () => {
  const mockData = {
    mddata: '---\n'
        + '1. First item\n'
        + '1. Second item\n'
        + '1. Third item\n'
        + '1. Fourth item\n',
  };

  const el = document.createElement('div');
  act(() => {
    ReactDom.render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <AddPanel content={mockData.mddata} />
      </StateProvider>, el,
    );
  });

  // expect(screen).toMatchSnapshot();

  act(() => {
    /* fire events that update state */
  });
  /* assert on the output */
  // const tree = render(<EditorPanel content={mockData.mddata} />);
  // expect(tree).toMatchSnapshot();
  const ta = el.querySelector('textarea');
  expect(ta.textContent).toContain('1. Second item');

  // expect(
  //   screen.getByText('1. Second item', { exact: false }),
  // ).toBeInTheDocument();
});
