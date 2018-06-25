import React, { Component } from 'react';
import PropTypes from 'prop-types';

import error from './svg/whiteKing';

class ErrorBoundary extends Component {
  static propTypes = { children: PropTypes.object };
  state = { hasError: false };

  componentDidCatch(error) {
    this.setState({ hasError: true });

    console.log(error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              width: 250,
              height: 250,
              transform: `rotate(90deg)`
            }}
          >
            {error.whiteKing}
          </div>
          <h1>Something went wrong. Check the console</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
