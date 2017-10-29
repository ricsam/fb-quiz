/*
 * AppReducer
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
  uid: '',
  pageLoading: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "fb:logged in":
      return state
        .set('uid', action.uid);
    case "fb:logged out":
      /* resetar allt till inital state */
      return initialState
    default:
      return state;
  }
}

export default appReducer;