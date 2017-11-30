import { call } from 'redux-saga/effects';
import firebase from 'firebase/app';
import removeFightRequest from './removeFightRequest';

export default function* createGame({ makerUID, takerUID }) {
  const db = firebase.firestore();
  const games = db.collection('games');
  const users = db.collection('users');


  const gameReference = yield call(async () => games.add({
    maker: users.doc(makerUID),
    taker: users.doc(takerUID),
  }));

  yield call(async () => users.doc(makerUID).collection('activeGames').add({
    gameId: gameReference,
    active: true,
    with: takerUID,
  }));
  yield call(async () => users.doc(takerUID).collection('activeGames').add({
    gameId: gameReference,
    active: true,
    with: makerUID,
  }));


  // remove the fight request
  yield* removeFightRequest({
    takerUID,
    makerUID,
  });

  return gameReference;
  // users.
  // users.
}
