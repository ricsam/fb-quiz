import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import injectSaga from 'utils/injectSaga';
// import If from 'components/If';
// import injectReducer from 'utils/injectReducer';
// import userReducer from './userReducer';
// import firebase from "firebase/app";
import DefaultButton from 'components/Button';
import Challenge from 'containers/Challenge';
import {Route, Link} from 'react-router-dom';
import Welcome from 'containers/Welcome';

const StyledButton = styled(DefaultButton)`
  width: 200px;
`;



const Button = ({ children, to, exact }) => (
  <Route path={to} exact={exact} children={({ match }) => (
    <Link to={to}><StyledButton disabled={!!match}>{children}</StyledButton></Link>
  )}/>
);

const Nav = styled.div`
  text-align: left;
  max-width: 600px;
`;


class MembersPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
      <Nav>
        <Button to="/" exact>Home</Button>
        <Button to="/challenge">Challenge a member</Button>
        <Button to="/wip">Play live game (22 online)</Button>
        <Button to="/wip">Leaderboards</Button>
        <Button to="/wip">Test your knowledge</Button>
        <Button to="/wip">Submit your own questions</Button>
        <Button to="/wip">Vote on questions to be added</Button>
      </Nav>
      <Route path="/" exact component={Welcome}/>
      <Route path="/Challenge" component={Challenge}/>
      </div>
    );
  }
}


const mapStateToProps = () => {
  return (state, props) => state.toJS()
};
const mapDispatchToProps = (dispatch) => ({dispatch});


const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withSaga = injectSaga({ key: 'userSaga', saga: userSaga });
// const withReducer = injectReducer({ key: 'user', reducer: userReducer });

export default compose(
  // withReducer,
  // withSaga,
  withConnect,
)(MembersPage);
