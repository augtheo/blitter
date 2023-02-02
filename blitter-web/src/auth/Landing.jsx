import React from 'react';
import Base from './Base';
import { LoginBase } from './Login';

function LandingBase() {
  return (
    <>
      <img className='mr-auto p-4' src='logo.svg' alt='quill logo' />
      <LoginBase className='' />
    </>
  );
}
export default function Landing() {
  return <Base child={<LandingBase />} />;
}
