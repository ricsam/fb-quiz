import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import If from 'components/If';
import injectReducer from 'utils/injectReducer';
import userReducer from './userReducer';
import LoadingButton from 'components/LoadingButton';
import MembersPage from 'containers/MembersPage';
import { Alert } from 'reactstrap';
import firebase from 'firebase/app';
import { Container, Row, Col } from 'reactstrap';

import { selectUser } from './selectors';
import userSaga from './userSaga';

// const rotate = keyframes`
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// `;

// const Logo = styled.img`
//   animation: ${rotate} infinite 20s linear;
//   height: 80px;
// `;

const AppWrapper = styled(Container)`
  text-align: center;
  background-color: #1f1f1f;
`;

const Header = styled.header`
  height: 9.375rem;
  padding: 1.25rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  font-family: TradeGothic, Oswald, sans-serif;
  font-weight: 300;
`;

const RowCol = props => (
  <Row>
    <Col>{props.children}</Col>
  </Row>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login() {
    if (
      this.props.user.login.error ===
      'You need to login with your @redeye.se google account'
    ) {
      await firebase.auth().signOut();
    }
    this.props.dispatch({
      type: 'fb:login',
    });
  }

  logout() {
    this.props.dispatch({
      type: 'fb:logout',
    });
  }

  render() {
    return (
      <AppWrapper>
        <RowCol>
          <Header>
            <Title>StockFight</Title>
          <If case={!this.props.user.uid}>
            <LoadingButton
              onClick={this.login}
              loading={this.props.user.login.loading}
              color="success"
            >
              Login
            </LoadingButton>
          </If>
          <If case={this.props.user.uid /* logged in*/}>
            <LoadingButton
              onClick={this.logout}
              loading={this.props.user.logout.loading}
              color="danger"
            >
              Logout
            </LoadingButton>
          </If>
          </Header>
        </RowCol>

        <RowCol>
          <If
            case={this.props.user.login.error || this.props.user.logout.error}
          >
            <Alert color="danger">
              {this.props.user.login.error}
              <br />
              {this.props.user.logout.error}
            </Alert>
          </If>
          <If case={this.props.user.uid /* logged in*/}>
            <MembersPage />
          </If>
        </RowCol>
      </AppWrapper>
    );
  }
}

const mapStateToProps = () => {
  return (state, props) => ({
    user: selectUser(state).toJS(),
  });
};
const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'user', saga: userSaga });
const withReducer = injectReducer({ key: 'user', reducer: userReducer });

export default compose(withReducer, withSaga, withConnect)(App);
