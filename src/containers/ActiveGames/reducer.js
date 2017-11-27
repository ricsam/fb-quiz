
import { fromJS } from 'immutable';

const initialState = fromJS({
  opponents: {}
});

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'set opponents':
      return state.set('opponents', fromJS(action.opponents));
    default:
      return state;
  }
}
