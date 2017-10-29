import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import injectSaga from 'utils/injectSaga';
// import If from 'components/If';
// import injectReducer from 'utils/injectReducer';
// import userReducer from './userReducer';

class Welcome extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>Welcome!</div>
    );
  }
}


const mapStateToProps = () => {
  return (state, props) => state.toJS()
};
const mapDispatchToProps = (dispatch) => ({dispatch});


const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withSaga = injectSaga({ key: 'userSaga', saga: userSaga });
// const withReducer = injectReducer({ key: 'user', reducer: userReducer });

export default compose(
  // withReducer,
  // withSaga,
  withConnect,
)(Welcome);
