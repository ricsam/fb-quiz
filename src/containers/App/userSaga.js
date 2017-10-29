import { takeLatest, call, put, select } from 'redux-saga/effects';
import firebase from 'firebase/app';


async function loginGoogle() {
  if (firebase.auth().currentUser) {
    await firebase.auth().signOut();
    return false;
  } else {
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const result = await firebase.auth().signInWithPopup(provider);
    return result.credential;
  }
}

export function* login(action) {
  try {
    const credential = yield call(loginGoogle)
    if (credential) {
      yield put({
        type: "fb:set credential",
        credential
      });
    }
  } catch (error) {
    yield put({
      type: "fb:login error",
      message: error.message
    });
  }
  // OBS: an action will automatically be dispatched from index.js via firebase.auth().onAuthStateChanged 
}

async function fbLogout() {
  await firebase.auth().signOut();
}

export function* logout() {
  try {
    yield call(fbLogout);
  } catch (error) {
    console.log(error);
    yield put({
      type: "fb:logout error",
      message: error.message
    });
  }
  // OBS: an action will automatically be dispatched from index.js via firebase.auth().onAuthStateChanged 
}


// man måste reauthenticata för att kunna deleta ibland.
async function fbRemoveUser(credential) {
  const user = firebase.auth().currentUser;
  try {
    await user.delete()
  } catch(error) {
    if ( ! error.code === 'auth/requires-recent-login' ) console.log(error);
    if (error.code === 'auth/requires-recent-login') {
      try {
        /* user must reloggin */
        if ( ! credential ) {
          return;
        }
        await user.reauthenticateWithCredential(credential);
        await user.delete();
      } catch(error) {
        console.log(error);
      }
    }
  } 
}

// denna funktion kommer från index.js att dispatcha logout action.
function* deleteUser() {
  const credential = yield select(state => state.get('credential') || false);
  yield call(fbRemoveUser, credential);
}


export default function* userSaga() {
  yield takeLatest('fb:delete user', deleteUser);
  yield takeLatest('fb:login', login);
  yield takeLatest('fb:logout', logout);
  // kommer dispatchas från index.js via firebase.auth().onAuthStateChanged
  // yield takeLatest('fb:logged in', getDB);
}
