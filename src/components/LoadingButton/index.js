import React from 'react';
import PropTypes from 'prop-types';
import {Button, CircleSpinner, Circle} from './LoadingButtonStyle';

export default class LoadingButton extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    loading: false,
    disabled: false,
  };

  render() {
    const props = {...this.props};
    delete props.loading;

    console.log(props);
    return (
      <Button {...props}>
        {!this.props.loading && <span>{this.props.children}</span>}
        {this.props.loading && (
          <CircleSpinner>
            <Circle i="0"/>
            <Circle i="1"/>
            <Circle i="2"/>
            <Circle i="3"/>
            <Circle i="4"/>
            <Circle i="5"/>
            <Circle i="6"/>
            <Circle i="7"/>
            <Circle i="8"/>
            <Circle i="9"/>
            <Circle i="10"/>
            <Circle i="11"/>
          </CircleSpinner>
        )}
      </Button>
    );
  }
}
