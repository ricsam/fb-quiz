import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

export default class ListItem extends React.PureComponent {
  static propTypes = {
    loadingAccept: PropTypes.bool,
    loadingDecline: PropTypes.bool,
    accept: PropTypes.func,
    decline: PropTypes.func,
    name: PropTypes.string,
    uid: PropTypes.string,
  };

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
