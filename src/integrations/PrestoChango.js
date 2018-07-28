import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Chessboard from '../Chessboard';

class PrestoChango extends Component {
  static propTypes = { children: PropTypes.func };

  state = { fen: 'start' };

  componentDidMount() {
    window.setTimeout(this.timer1);
    window.setTimeout(this.timer2);
    window.setTimeout(this.timer3);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer1);
    window.clearTimeout(this.timer2);
    window.clearTimeout(this.timer3);
  }

  timer1 = () => window.setTimeout(this.onTimer1, 3000);
  timer2 = () => window.setTimeout(this.onTimer2, 6000);
  timer3 = () => window.setTimeout(this.onTimer3, 9000);

  onTimer1 = () => {
    this.setState({
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 1'
    });
  };

  onTimer2 = () => {
    this.setState({ fen: '4K1k1/4P3/8/8/8/8/r7/1R6 w - - 0 1' });
  };

  onTimer3 = () => {
    this.setState({ fen: '4K1k1/4P3/8/8/8/8/r7/6R1 b - - 1 1' });
  };

  render() {
    const { fen } = this.state;
    return this.props.children({ position: fen });
  }
}

/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */
export default function PrestoChangoExample() {
  return (
    <div>
      <PrestoChango>
        {({ position }) => (
          <Chessboard
            calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
            id="presto"
            position={position}
            transitionDuration={300}
            boardStyle={{
              borderRadius: '5px',
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
          />
        )}
      </PrestoChango>
    </div>
  );
}
