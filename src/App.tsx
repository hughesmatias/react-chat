import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import SignIn from './components/signIn';
import ChatRoom from './components/chatRoom';

const {
  REACT_APP_apiKey: apiKey,
  REACT_APP_authDomain: authDomain,
  REACT_APP_databaseURL: databaseURL,
  REACT_APP_projectId: projectId,
  REACT_APP_storageBucket: storageBucket,
  REACT_APP_messagingSenderId: messagingSenderId,
  REACT_APP_appId: appId,
} = process.env;

firebase.initializeApp({
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
});

const App = () => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const [user] = useAuthState(auth);

  const signOutEvent = () => auth.signOut();

  return (
    <div className="App">
      <header></header>
      <section>
        {user ? (
          <>
            <button onClick={signOutEvent}>Sign out</button>
            <ChatRoom messageRef={firestore.collection('messages')} auth={auth} />
          </>
        ) : (
          <SignIn
            googleProvider={firebase.auth.GoogleAuthProvider}
            auth={auth}
          />
        )}
      </section>
    </div>
  );
};

export default App;
