
import { fromJS } from 'immutable';


// The initial state of the App
const initialState = fromJS({
});

export default function reducer(state = initialState, action) {

  switch (action.type) {
    default:
      return state;
  }

}