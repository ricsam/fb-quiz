import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './configureStore';
import './styles/bootstrap/bootstrap.css';
import './styles/bootstrap/bootstrap-grid.css';
import './index.css';

import { saveTrie, search } from 'utils/fbSearchDB';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);


const config = {
  apiKey: "AIzaSyB5JNyH0NvoOOZDcJRnZdEfQJe0VYbJVpQ",
  authDomain: "stockfight-5975a.firebaseapp.com",
  databaseURL: "https://stockfight-5975a.firebaseio.com",
  projectId: "stockfight-5975a",
  storageBucket: "stockfight-5975a.appspot.com",
  messagingSenderId: "340501530075"
};

firebase.initializeApp(config);







// mV73RvdhQSNHtXDGOorb4jds

async function saveUser(name) {


  const db = firebase.firestore();
  // for (var i = 0; i < name.length; i++) {
  //   var letter = name[i];

  //   var level = goDownTrie(base, baseIndex, letter);
  //   base = level.base;
  //   baseIndex = level.index;

  // }
  // await save('lol');
  // await saveTrie('lal', 'lol');
  // await saveTrie('lul');
  // await saveTrie('lolla');

  // await saveTrie(db, 'lagrport', {
  //   tag: 'lagsport',
  //   distance: 1
  // });

  const result = await search(db, 'lag');


  console.log(result);

  return;

  await db.collection("index").doc('tree').delete();
  await db.collection("index").doc('tagIndex').delete();
  await db.collection("index").doc('mappings').delete();


  const mappings = await db.collection("index").doc('mappings');
    const tags = await mappings.collection('tags');
    const tid0 = await tags.add({
      key: 'hello',
      duplicates: 0,
    });
    const tid1 = await tags.add({
      key: 'hell',
      duplicates: 0,
    });

    const mutations = await mappings.collection('mutations').doc('hell');
    await mutations.set({
      value: 'fell',
      at: 0,
      distance: 1
    });

  /* end mappings */

  const tagIndex = await db.collection("index").doc('tagIndex');
  await tagIndex.set({
    'hello': tid0,
    'hell': tid1,
  });


  console.log("Document written");
}

firebase.auth().onAuthStateChanged(function(user) {
  // User is signed in.
  if (user) {
    if (user.email.match(/@redeye.se$/)) {
      saveUser(user.displayName);
      store.dispatch({
        type: "fb:logged in",
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      });
    } else {
      store.dispatch({
        type: "fb:login error",
        message: 'You need to login with your @redeye.se google account',
      });
    }
  } else {
    // User is signed out.
    store.dispatch({
      type: "fb:logged out",
    });
  }
});


registerServiceWorker();
