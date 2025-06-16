import { errorWrapper } from './errorUtils';

const errors = {
  errors: [
    {
      location: 'body',
      msg: 'Invalid value',
      param: 'username',
    },
  ],
};

test('Test error wrapper', () => {
  expect(errorWrapper(errors)).toStrictEqual({ errors: 'username: Invalid value\n' });
});
