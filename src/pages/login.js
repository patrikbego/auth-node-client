import React from 'react';
import Login from '../components/Login';
import controllers from '../api/controller';
// import config from '../../config.local';

export default function LoginP({ URL }) {
  return (
    <>
      <Login URL={URL} />
    </>
  );
}

export async function getStaticProps() {
  const URL = await controllers.url();
  console.log('URL', URL);
  // console.log('config.restApi', config.restApi);
  console.log('controllers.url()', controllers.url());
  console.log('URL', URL);
  console.log('controllers.url', controllers.URL);
  console.log('process.env.NEXT_PUBLIC_REST_API', process.env.NEXT_PUBLIC_REST_API);
  console.log('process.env.NEXT_PUBLIC_ENV_NAME', process.env.NEXT_PUBLIC_ENV_NAME);
  return {
    props: {
      URL,
    },
  };
}
