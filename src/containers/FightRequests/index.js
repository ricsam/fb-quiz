import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import If from 'components/If';
import Loader from 'components/Loader';
import ListItem from 'components/RequestList';
import saga from './saga.js';
import reducer from './reducer.js';


const Wrapper = styled.div`
  color: white;
`;


const List = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
`;


class FightRequests extends React.PureComponent {

  static propTypes = {
    requests: PropTypes.object,
    loading: PropTypes.bool,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'fr:get users',
    });
  }

  accept = (uid) => {
    this.props.dispatch({
      type: 'fr:accept',
      uid,
    });
  };
  decline = (uid) => {
    this.props.dispatch({
      type: 'fr:decline',
      uid,
    });
  };

  render() {
    const requestsMap = Object.keys(this.props.requests);
    return (
      <Wrapper>
        <If case={this.props.loading}>
          Loading fight requests
          <Loader />
        </If>
        <If case={requestsMap.length}>
          <List>

            {requestsMap.map((uid) => <ListItem accept={this.accept} decline={this.decline} key={uid} uid={uid} {...this.props.requests[uid] /* name, timestamp, loadingAccept/loadingDecline */}></ListItem>)}
          </List>
        </If>
      </Wrapper>
    );
  }
}

FightRequests.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => state.get('fightRequests').toJS();

const mapDispatchToProps = (dispatch) => ({ dispatch });


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'fightRequests', reducer });
const withSaga = injectSaga({ key: 'fightRequests', saga });

export default compose(withReducer, withSaga, withConnect)(FightRequests);

