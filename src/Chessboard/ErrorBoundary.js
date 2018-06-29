import React, { Component } from 'react';
import PropTypes from 'prop-types';

import error from './svg/whiteKing';

class ErrorBoundary extends Component {
  static propTypes = { children: PropTypes.object };
  state = { hasError: false };

  componentDidCatch(error) {
    this.setState({ hasError: true });

    console.error(error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={container}>
          <div style={whiteKingStyle}>{error.whiteKing}</div>
          <h1>Something went wrong</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};

const whiteKingStyle = {
  width: 250,
  height: 250,
  transform: `rotate(90deg)`
};
