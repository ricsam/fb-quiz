import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ButtonStyle from 'components/LoadingButton';


const Button = styled(ButtonStyle)``;
const NameText = styled.p`
  flex: 1;
  margin: 0;
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

export default class Item extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    promptText: PropTypes.string,
    prompt: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    initialize: PropTypes.func,
    id: PropTypes.string,
  };
  onClick = () => {
    this.props.onClick(this.props.id);
  };
  initializeFight = () => {
    if (!this.props.loading) {
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

