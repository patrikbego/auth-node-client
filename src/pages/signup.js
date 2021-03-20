import React from 'react';
import SignUp from '../components/SignUp';
import Header from '../components/Header';

export default function SignUpP() {
  return (
    <>
      <Header loading={false} />
      <SignUp />
    </>
  );
}
