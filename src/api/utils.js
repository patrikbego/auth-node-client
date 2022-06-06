import { useRouter } from 'next/router';

export async function resInterceptor(res) {
  const router = useRouter();

  if (res.code === 401) {
    await router.push('/login');
    return null;
  }
  // TODO in case the body is not json it will fail
  return res.json();
}

export async function handleErrors(res) {
  if (res.status === 401) {
    throw new Error('User login failed!');
  } else if (res.status === 429) {
    throw new Error('Something went wrong, please contact support@octoplasm.com');
  } else if (!res.ok) {
    console.log('Something went wrong', res);
    try {
      const data = await res.json();
      throw new Error(data.message);
    } catch (e) {
      console.error('Error in handle errors: ', e);
      throw new Error(e);
    }
  }
  return res;
}
