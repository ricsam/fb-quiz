import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import If from 'components/If';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

const Wrapper = styled.div``;

class ActiveGames extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.dispatch({
      type: 'fetch games',
    });
  }

  render() {
    const opponents = this.props.activeGames.opponents;
    console.log(this.props);
    return (
      <Wrapper>
        <h3>Active games:</h3>
        <If case={Object.keys(opponents).length}>
          <ul>
            {Object.keys(opponents).map(uid => <li key={uid}>{opponents[uid].against}</li>) }
          </ul>
        </If>
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    activeGames: state.get('activeGames').toJS(),
  };
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
