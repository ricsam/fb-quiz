
import firebase from 'firebase/app';
import {takeLatest, call, put} from 'redux-saga/effects';


function* getUsers() {
  const currentUser = firebase.auth().currentUser;

  const db = firebase.firestore();
  const usersRef = db.collection('users');
  const query = usersRef.orderBy('name');
  const result = yield call(async () => await query.get());
  console.log(result.docs);
  const docs = result.docs;
  const users = docs.reduce((o, snapshot) => {
    o[snapshot.id] = snapshot.data()
    return o;
  }, {});

  yield put({
    type: 'set users',
    users,
  });
}

export default function* saga() {
  yield takeLatest('get users', getUsers);
}
