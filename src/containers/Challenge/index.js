import React from 'react';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import ButtonStyle from 'components/LoadingButton';
import { compose } from 'redux';
import styled from 'styled-components';
import saga from './saga';
import reducer from './reducer';

const Button = styled(ButtonStyle)``;

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
const ListItem = styled.li`
  font-family: Libre Franklin;
  font-size: 1.15em;
  list-style: none;
  padding: 0.5em;
  margin: 1em 0;
  border: 1px solid white;
  color: white;
  :hover {
    cursor: pointer;
    color: skyblue;
    border-color: skyblue;
  }
  display: flex;
  align-items: center;
`;

const NameText = styled.p`
  flex: 1;
  margin: 0;
`;

class Item extends React.PureComponent {
  onClick = () => {
    this.props.onClick(this.props.id);
  };
  initializeFight = () => {
    if ( ! this.props.loading ) {
      this.props.initialize(this.props.id);
    }
  };
  render() {
    return (
      <ListItem onClick={this.onClick}>
        <NameText>{this.props.children}</NameText>
        {this.props.prompt && (
          <Button onClick={this.initializeFight} loading={this.props.loading} disabled={this.props.loading}>{this.props.promptText}</Button>
        )}
      </ListItem>
    );
  }
}

class ListItems extends React.PureComponent {
  render() {
    if (!Object.keys(this.props.users).length) return null;
    const users = [];
    Object.keys(this.props.users).forEach(key => {
      const user = this.props.users[key];
      if (this.props.filter(user)) {
        users.push(
          <Item
            key={key}
            id={key}
            initialize={this.props.initialize}
            onClick={this.props.onClick}
            prompt={this.props.challengePrompt === key}
            promptText={this.props.promptText}
            loading={user.fightRequestedLoading}
          >
            {user.name}
          </Item>
        );
      }
    });
    return users;
  }
}

class Challenge extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'get users',
    });
  }
  state = {
    challengePrompt: false,
  };

  clickUser = id => {
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

  startFight = uid => {
    this.props.dispatch({
      type: 'request fight',
      uid,
    });
  };


  cancelFight = uid => {
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

const mapStateToProps = () => {
  return (state, props) => state.get('challenge').toJS();
};
const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'challenge', reducer });
const withSaga = injectSaga({ key: 'challenge', saga });

export default compose(withReducer, withSaga, withConnect)(Challenge);
