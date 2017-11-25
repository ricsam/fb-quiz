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


firebase.auth().onAuthStateChanged(function(user) {
  // User is signed in.
  if (user) {
    if (user.email.match(/@redeye.se$/) || user.email === 'noobtoothfairy@gmail.com') {
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
