import React from 'react';
import SignUp from '../src/components/SignUp';
import Header from '../src/components/Header';

export default function SignUpP() {
  return (
    <>
      <Header loading={false} />
      <SignUp />
    </>
  );
}
