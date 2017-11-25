
import { fromJS } from 'immutable';


// The initial state of the App
const initialState = fromJS({
  usersLoading: false,
  usersError: false,
  users: {},
});

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case 'get users':
      return state.set('usersLoading', true);
    case 'set users':
      console.log(action.users);
      return state
        .set('usersLoading', false)
        .set('users', action.users);
    default:
      return state;
  }

}
