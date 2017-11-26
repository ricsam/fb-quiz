import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
// import If from 'components/If';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

const Wrapper = styled.div``;

class ActiveGames extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Wrapper>Welcome!</Wrapper>
    );
  }
}


const mapStateToProps = () => {
  return (state, props) => state.toJS()
};
const mapDispatchToProps = (dispatch) => ({dispatch});


const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'activeGames', saga });
const withReducer = injectReducer({ key: 'activeGames', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ActiveGames);
