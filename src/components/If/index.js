import React from 'react';
import PropTypes from 'prop-types';

export default class If extends React.PureComponent {
  static propTypes = {
    case: PropTypes.any,
    el: PropTypes.node,
    children: PropTypes.node,
  };

  render() {
    if (this.props.case) {
      if (this.props.el) {
        return <this.props.el>{this.props.children}</this.props.el>;
      }
      return this.props.children;
    }
    return null;
  }
}
