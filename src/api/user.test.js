import { getUserData } from './users';

it('tests get user by id', async () => {
  const mockResponse1 = JSON.stringify({ name: 'Patrik', surname: 'Test', about: 'Test' });
  fetch.mockResponseOnce(mockResponse1);
  const response = await getUserData('patrik.test');
  expect(response.name).toEqual('Patrik');
  expect(response.surname).toEqual('Test');
});

it('tests get non existing user', async () => {
  const mockResponse1 = JSON.stringify({});
  fetch.mockResponseOnce(mockResponse1);
  const response = await getUserData('test');
  expect(response.name).toEqual(undefined);
  expect(response.surname).toEqual(undefined);
});
