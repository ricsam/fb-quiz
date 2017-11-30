import React from 'react';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import ListItems from 'components/ChallengeList';
import { compose } from 'redux';
import styled from 'styled-components';
import saga from './saga';
import reducer from './reducer';


const Wrapper = styled.div`
  margin: 2.5em 0;
`;

const Header = styled.h3`
  text-align: left;
`;

const Text = styled.p``;
const List = styled.ul`
  text-align: left;
  padding: 0;
`;


class Challenge extends React.PureComponent {

  static propTypes = {
    dispatch: PropTypes.func,
    usersLoading: PropTypes.bool,
    users: PropTypes.object,
  };

  state = {
    challengePrompt: '',
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'get users',
    });
  }
  clickUser = (id) => {
    this.setState({
      challengePrompt: id,
    });
  };
  availableUsersFilter(user) {
    return !user.fightRequested;
  }
  fightRequestedFilter(user) {
    return user.fightRequested === true;
  }

  startFight = (uid) => {
    this.props.dispatch({
      type: 'request fight',
      uid,
    });
  };


  cancelFight = (uid) => {
    this.props.dispatch({
      type: 'cancel fight request',
      uid,
    });
  };

  render() {
    return (
      <Wrapper>
        {this.props.usersLoading && <Text>Loading users...</Text>}
        <Header>Fight requested</Header>
        <List>
          <ListItems
            challengePrompt={this.state.challengePrompt}
            users={this.props.users}
            initialize={this.cancelFight}
            onClick={this.clickUser}
            filter={this.fightRequestedFilter}
            promptText="Cancel request"
          />
        </List>
        <Header>Users</Header>
        <List>
          <ListItems
            challengePrompt={this.state.challengePrompt}
            users={this.props.users}
            initialize={this.startFight}
            onClick={this.clickUser}
            filter={this.availableUsersFilter}
            promptText="Start a stock fight!"
          />
        </List>
      </Wrapper>
    );
  }
}

const mapStateToProps = () => (state) => state.get('challenge').toJS();
const mapDispatchToProps = (dispatch) => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'challenge', reducer });
const withSaga = injectSaga({ key: 'challenge', saga });

export default compose(withReducer, withSaga, withConnect)(Challenge);
