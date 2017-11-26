
import { fromJS } from 'immutable';

const initialState = fromJS({
  requests: {},
  loading: false,
  error: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case 'fr:get users':
      return state
        .set('loading', true);
    case 'fr:users loaded':
      console.log(action.requests);
      return state
        .set('loading', false)
        .set('requests', fromJS(action.requests));

    case 'fr:decline':
      return state
        .setIn(['requests', action.uid, 'loadingDecline'], true);

    case 'fr:accept':
      console.log(action.uid, state.get('requests').toJS());
      return state
        .setIn(['requests', action.uid, 'loadingAccept'], true);

    // case 'fr:challenge accepted'
    case 'fr:declined':
      return state
        .removeIn(['requests', action.uid]);

    case 'fr:challenge accepted':
      console.log('challenge accepted!', action, state.toJS());
      return state
        .removeIn(['requests', action.uid]);


  }
}
