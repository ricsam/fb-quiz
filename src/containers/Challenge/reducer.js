
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
      return state
        .set('usersLoading', false)
        .set('users', fromJS(action.users));
    case 'request fight':
      return state
        .setIn(['users', action.uid, 'fightRequestedLoading'], true);
    case 'fight request done':
      return state
        .setIn(['users', action.uid, 'fightRequestedLoading'], false)
        .setIn(['users', action.uid, 'fightRequested'], true);

    case 'cancel fight request':
      return state
        .setIn(['users', action.uid, 'fightRequestedLoading'], true);

    case 'fight request canceled':
      return state
        .setIn(['users', action.uid, 'fightRequestedLoading'], false)
        .setIn(['users', action.uid, 'fightRequested'], false);
    default:
      return state;
  }
}
