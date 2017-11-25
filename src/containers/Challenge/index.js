import React from 'react';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import ButtonStyle from 'components/Button';
import { compose } from 'redux';
import styled from 'styled-components';
import saga from './saga';
import reducer from './reducer';

const Button = styled(ButtonStyle)``;

const Wrapper = styled.div`
  margin: 1.25em 0;
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
    this.props.initialize(this.props.id);
  };
  render() {
    return (
      <ListItem onClick={this.onClick}>
        <NameText>{this.props.children}</NameText>
        {this.props.prompt && (
          <Button
            onClick={this.initializeFight}
          >
            Start a stockfight!
          </Button>
        )}
      </ListItem>
    );
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

  startFight = id => {
    this.props.dispatch({
      type: 'start fight',
      id,
    });
    console.log('will start a fight');
  };

  render() {
    console.log(this.props);
    return (
      <Wrapper>
        <Header>Users</Header>
        {this.props.usersLoading && <Text>Loading users...</Text>}
        <List>
          {Object.keys(this.props.users) &&
            Object.keys(this.props.users).map(key => {
              return (
                <Item
                  key={key}
                  id={key}
                  initialize={this.startFight}
                  onClick={this.clickUser}
                  prompt={this.state.challengePrompt === key}
                >
                  {this.props.users[key].name}
                </Item>
              );
            })}
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
