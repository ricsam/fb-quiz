import React, { Component } from 'react';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';


class Challenge extends Component {

  render() {
    return (
      <div>
        <h1>Challenge</h1>
      </div>
    );
  }
}


const mapStateToProps = () => {
  return (state, props) => state.toJS()
};
const mapDispatchToProps = (dispatch) => ({dispatch});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'challenge', reducer });
const withSaga = injectSaga({ key: 'challenge', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Challenge);
