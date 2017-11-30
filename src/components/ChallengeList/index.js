import React from 'react';
import PropTypes from 'prop-types';
import Item from 'components/ChallengeListItem';


export default class ListItems extends React.PureComponent {

  static propTypes = {
    users: PropTypes.object,
    initialize: PropTypes.func,
    onClick: PropTypes.func,
    challengePrompt: PropTypes.string,
    promptText: PropTypes.string,
    filter: PropTypes.func,
  };

  render() {
    if (!Object.keys(this.props.users).length) return null;
    const users = [];
    Object.keys(this.props.users).forEach((key) => {
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
