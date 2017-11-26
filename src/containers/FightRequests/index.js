import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import If from 'components/If';
import Loader from 'components/Loader';
import saga from './saga.js';
import reducer from './reducer.js';
import ButtonStyle from 'components/LoadingButton';

const Button = styled(ButtonStyle)`
  justify-self: flex-end;
  margin-left: auto;
  :last-child {
    margin: 0
  }
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  align-content: stretch;
`;

const Wrapper = styled.div`
  color: white;
`;

const ListItemStyle = styled.li`
  font-family: Libre Franklin;
  font-size: 1.15em;
  list-style: none;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid white;
  color: white;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
`;

const ListText = styled.p`
  flex: 1;
  margin: 0.5em 0.5em 0.5em 0;
  min-width: 60%;
  text-align: left;
`;


const List = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
`;

class ListItem extends React.PureComponent {
  accept = () => {
    if (!this.props.loadingAccept && !this.props.loadingDecline) {
      this.props.accept(this.props.uid);
    }
  };

  decline = () => {
    if (!this.props.loadingAccept && !this.props.loadingDecline) {
      this.props.decline(this.props.uid);
    }
  };
  render() {
    return (
    <ListItemStyle>
      <ListText>
       {this.props.name} want to challenge you in a stock fight!
      </ListText>
      <ButtonContainer>
        <Button onClick={this.accept} loading={this.props.loadingAccept} disabled={this.props.loadingAccept || this.props.loadingDecline}>Accept</Button>
        <Button onClick={this.decline} loading={this.props.loadingDecline} disabled={this.props.loadingAccept || this.props.loadingDecline}>Decline</Button>
      </ButtonContainer>
    </ListItemStyle>
    );
  }
}

class FightRequests extends React.PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'fr:get users'
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
    console.log(this.props.requests);
    return (
      <Wrapper>
        <If case={this.props.loading}>
          Loading fight requests
          <Loader />
        </If>
        <If case={requestsMap.length}>
          <List>
            
              {requestsMap.map(uid => <ListItem accept={this.accept} decline={this.decline} key={uid} uid={uid} {...this.props.requests[uid] /* name, timestamp, loadingAccept/loadingDecline */}></ListItem>)}
          </List>
        </If>
      </Wrapper>
    )
  }
}

FightRequests.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log(state.get('fightRequests').toJS());
  return {
    ...state.get('fightRequests').toJS(),
  };
}

const mapDispatchToProps = (dispatch) => ({dispatch,});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'fightRequests', reducer });
const withSaga = injectSaga({ key: 'fightRequests', saga });

export default compose(withReducer, withSaga, withConnect)(FightRequests);

