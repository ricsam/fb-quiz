import firebase from 'firebase/app';
import { call } from 'redux-saga/effects';


export default function* removeFightRequest({ takerUID, makerUID }) {
  const db = firebase.firestore();
  const usersRef = db.collection('users');
  const requestsFromRef = usersRef
    .doc(takerUID)
    .collection('fightRequestsFrom');
  /* check if request has already been done */
  const querySnapshotFrom = yield call(
    async () => requestsFromRef.where('uid', '==', makerUID).get()
  );
  if (!querySnapshotFrom.empty) {
    /* document does exist */

    yield call(async () => {
      await Promise.all(querySnapshotFrom.docs.map((doc) => doc.ref.delete()));
    });
  }

  const requestsToRef = usersRef
    .doc(makerUID)
    .collection('fightRequestsTo');
  /* check if request has already been done */
  const querySnapshotTo = yield call(
    async () => requestsToRef.where('uid', '==', takerUID).get()
  );
  if (!querySnapshotTo.empty) {
    /* document already exist */
    yield call(async () => {
      await Promise.all(querySnapshotTo.docs.map((doc) => doc.ref.delete()));
    });
  }
}
