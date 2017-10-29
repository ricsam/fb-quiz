/*
 * LoginReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';


// The initial state of the App
const initialState = fromJS({
  login: {
    loading: false,
    error: false,
  },
  logout: {
    loading: false,
    error: false,
  },
  credential: false,
  uid: false,
  email: false,
  name: false,

});

function appReducer(state = initialState, action) {
  switch (action.type) {

    /* used for account deletion */
    case "fb:set credential":
      return state
        .set('credential', action.credential); 

    /* Login */
    case 'fb:login':
      return state
        .setIn(['login', 'loading'], true)
        .setIn(['login', 'error'], false);
    case 'fb:login error':
      return initialState
        .setIn(['login', 'error'], action.message);

    /* Logout */
    case 'fb:logout':
      return state
        .setIn(['logout', 'loading'], true)
        .setIn(['logout', 'error'], false);
    case 'fb:logout error':
      return state
        .setIn(['logout', 'loading'], false)
        .setIn(['logout', 'error'], action.message);

    case "fb:logged in":
      return state
        .setIn(['login', 'loading'], false)
        .setIn(['login', 'error'], false)
        .set('uid', action.uid)
        .set('email', action.email)
        .set('name', action.name);

    case "fb:logged out":
      /* resetar allt till inital state */
      return initialState

    default:
      return state;
  }
}

export default appReducer;