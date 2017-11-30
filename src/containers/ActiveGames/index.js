import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

  static propTypes = {
    dispatch: PropTypes.func,
    activeGames: PropTypes.object,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'fetch games',
    });
  }

  render() {
    const opponents = this.props.activeGames.opponents;
    return (
      <Wrapper>
        <h3>Active games:</h3>
        <If case={Object.keys(opponents).length}>
          <ul>
            {Object.keys(opponents).map((uid) => <li key={uid}>{opponents[uid].against}</li>) }
          </ul>
        </If>
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => ({
  activeGames: state.get('activeGames').toJS(),
});
const mapDispatchToProps = (dispatch) => ({ dispatch });


const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'activeGames', saga });
const withReducer = injectReducer({ key: 'activeGames', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ActiveGames);
