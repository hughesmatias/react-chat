import React from 'react';

interface SignInInterface {
  googleProvider: any;
  auth: any;
};

const SignIn = ({
  googleProvider,
  auth,
}: SignInInterface) => {
  const signInEvent = () => {
    const provider = new googleProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button type="button" onClick={signInEvent}>Sign In</button>
  );
};

export default SignIn;