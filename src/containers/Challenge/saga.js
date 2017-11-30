import firebase from 'firebase/app';
import { takeLatest, call, put } from 'redux-saga/effects';

import createGame from 'functions/createGame';
import removeFightRequest from 'functions/removeFightRequest';
import has from 'lodash/has';


function* cancelFightRequest({ uid }) {
  const currentUser = firebase.auth().currentUser;

  yield* removeFightRequest({
    takerUID: uid,
    makerUID: currentUser.uid,
  });

  yield put({
    type: 'fight request canceled',
    uid,
  });
}

function* getUsers() {
  const currentUser = firebase.auth().currentUser;

  const db = firebase.firestore();
  const usersRef = db.collection('users');
  const query = usersRef.orderBy('name');
  const result = yield call(async () => query.get());
  const docs = result.docs;
  const requestsToRef = usersRef
    .doc(currentUser.uid)
    .collection('fightRequestsTo');
  const querySnapshotTo = yield call(async () => requestsToRef.get());

  const openRequestsMap = {};

  if (!querySnapshotTo.empty) {
    querySnapshotTo.docs.forEach((doc) => {
      openRequestsMap[doc.get('uid')] = true;
    });
  }

  const users = docs.reduce((o, snapshot) => {
    const data = snapshot.data();
    const uid = data.uid;
    if (currentUser.uid === uid) return o;
    return { ...o,
      [uid]: {
        ...data,
        fightRequested: has(openRequestsMap, uid),
      } };
  }, {});

  yield put({
    type: 'set users',
    users,
  });
}

function* requestFight({ uid: userToBeRequested }) {
  const currentUser = firebase.auth().currentUser;

  const db = firebase.firestore();
  const usersRef = db.collection('users');

  const userToBeRequestedReference = usersRef.doc(userToBeRequested);
  const userRequestingReference = usersRef.doc(currentUser.uid);

  /* check if userToBeRequested has already challenged userRequesting */
  const requestDoneRef = userToBeRequestedReference.collection('fightRequestsTo');
  const querySnapshotDone = yield call(
    async () => requestDoneRef.where('uid', '==', currentUser.uid).get()
  );

  if (!querySnapshotDone.empty) {
    const gameReference = yield* createGame({ takerUID: currentUser.uid, makerUID: userToBeRequested });
    // as the game has been accepted, remove from active requests
    yield put({
      type: 'fight request canceled',
      uid: userToBeRequested,
    });
    // update the game UI! (This is equvalent to pressing the accept button)
    yield put({
      type: 'fr:challenge accepted',
      id: gameReference.id,
      uid: userToBeRequested,
    });
    return true;
  }

  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  const requestsFromRef = userToBeRequestedReference.collection(
    'fightRequestsFrom'
  );
  /* check if request has already been done */
  const querySnapshotFrom = yield call(
    async () => requestsFromRef.where('uid', '==', currentUser.uid).get()
  );
  if (querySnapshotFrom.empty) {
    /* document does not exist */

    yield call(
      async () =>
        requestsFromRef.add({
          uid: currentUser.uid,
          reference: userRequestingReference,
          timestamp,
        })
    );
  }

  const requestsToRef = userRequestingReference.collection('fightRequestsTo');
  /* check if request has already been done */
  const querySnapshotTo = yield call(
    async () => requestsToRef.where('uid', '==', 'currentUser').get()
  );
  if (querySnapshotTo.empty) {
    /* document does not exist */
    yield call(
      async () =>
        requestsToRef.add({
          uid: userToBeRequested,
          reference: userToBeRequestedReference,
          timestamp,
        })
    );
  }

  yield put({
    type: 'fight request done',
    uid: userToBeRequested,
  });

  return true;
}


export default function* saga() {
  yield takeLatest('get users', getUsers);
  yield takeLatest('request fight', requestFight);
  yield takeLatest('cancel fight request', cancelFightRequest);
}
