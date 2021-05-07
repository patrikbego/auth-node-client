import { useRouter } from 'next/router';

export default async function resInterceptor(res) {
  const router = useRouter();

  if (res.code === 401) {
    await router.push('/login');
    return null;
  }

  return res.json();
}
