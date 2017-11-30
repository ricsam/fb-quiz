import { takeLatest, call, put } from 'redux-saga/effects'; // eslint-disable-line
import firebase from 'firebase/app';
import createGame from 'functions/createGame';
import removeFightRequest from 'functions/removeFightRequest';


function* acceptFight({ uid }) {
  const currentUser = firebase.auth().currentUser;

  const gameReference = yield* createGame({
    makerUID: uid,
    takerUID: currentUser.uid,
  });

  yield put({
    type: 'fr:challenge accepted',
    id: gameReference.id,
    uid,
  });
}

function* resolveGetRequests() {
  yield put({
    type: 'fr:users loaded',
    requests: {},
  });
}

export function* declineChallenge({ uid }) {
  const currentUser = firebase.auth().currentUser;

  yield* removeFightRequest({ takerUID: currentUser.uid, makerUID: uid });

  yield put({
    type: 'fr:declined',
    uid,
  });

  // users.
}

function* getRequests() {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const users = db.collection('users');

  const requestsRef = users
    .doc(currentUser.uid)
    .collection('fightRequestsFrom');
  const querySnapshot = yield call(async () => requestsRef.get());
  if (querySnapshot.empty) {
    return yield* resolveGetRequests();
  }
  const userDocuments = yield call(
      async () =>
        Promise.all(
          querySnapshot.docs.map(
            (doc) =>
              new Promise(async (resolve) => {
                resolve([
                  await doc.get('reference').get(),
                  doc.get('timestamp'),
                ]);
              })
          )
        )
    );


  if (!userDocuments) {
    return yield* resolveGetRequests();
  }

  const requests = userDocuments.reduce((o, [userDoc, timestamp]) => ({ ...o, [userDoc.get('uid')]: { name: userDoc.get('name'), timestamp } }), {});

  return yield put({
    type: 'fr:users loaded',
    requests,
  });


  // yield
}

export default function* defaultSaga() {
  yield takeLatest('fr:get users', getRequests);
  yield takeLatest('fr:accept', acceptFight);
  yield takeLatest('fr:decline', declineChallenge);
}
