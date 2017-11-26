import React from 'react';
// import PropTypes from 'prop-types';
import svg from './loading.svg';

export default class Loader extends React.PureComponent {
  render() {
    return(<img src={svg} alt="" {...this.props} />);
  }
}
