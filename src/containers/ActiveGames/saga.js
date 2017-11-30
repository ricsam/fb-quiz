import { takeLatest, call, put } from 'redux-saga/effects'; // eslint-disable-line
import firebase from 'firebase/app';

function* fetchGames() {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;

  const users = db.collection('users');
  const activeGames = users.doc(currentUser.uid).collection('activeGames');

  const querySnapshot = yield call(async () => activeGames.get());

  let opponents = {};

  if (!querySnapshot.empty) {
    const opponentSnapshots = yield call(
      async () =>
        Promise.all(
          querySnapshot.docs.map((doc) => new Promise(async (resolve, reject) => {
            try {
              const snapshot = await users.doc(doc.get('with')).get();
              resolve([
                doc.id,
                snapshot,
              ]);
            } catch (err) {
              reject(err);
            }
          }))
        )
    );


    opponents = opponentSnapshots.reduce((o, [id, snapshot]) => ({ ...o, [id]: { against: snapshot.get('name') } }), {});
  }


  yield put({
    type: 'set opponents',
    opponents,
  });

  // const games = db.collection('games');
}

export default function* saga() {
  yield takeLatest('fetch games', fetchGames);
}
