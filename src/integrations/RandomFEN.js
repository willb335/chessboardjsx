import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Chess from 'chess.js';

class RandomFEN extends Component {
  static propTypes = {
    children: PropTypes.func
  };

  state = {
    fen: 'start',
    fens: [
      'rnbqkb1r/pppp1ppp/3p4/7n/1B1B1P2/2P5/PP2PPPP/RN1QK1NR w KQkq -',
      'rnbqkQ1r/pBpp1ppp/3p4/2q1K1bn/1B3P2/2P2B2/PP2PPPP/RN2K1NR w KQkq -',
      'rnbqk2R/pBppNpQp/3p4/2q1K1bn/qB1K1P2/2P2B2/PP2PPPP/RNr1nnb1 w KQkq -',
      'rnbqkb1r/ppp1pppp/3p1n2/8/8/4BN2/PPPPPPPP/RNBQK2R w KQkq -',
      'rnbqkb1r/ppp1pppp/3p1n2/8/8/4BN2/PPPPPPPP/RNBQ1RK1 w KQkq -'
    ],
    i: 0
  };

  componentDidMount() {
    this.game = new Chess();
    this.getNewFEN();
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer());
  }

  timer = () => window.setTimeout(this.getNewFEN, 1500);

  getNewFEN = () => {
    this.setState(({ fens, i }) => ({
      fen: fens[i],
      i: Math.floor(Math.random() * Math.floor(fens.length))
    }));
    this.timer();
  };

  render() {
    const { fen } = this.state;
    return this.props.children({ position: fen });
  }
}

export default RandomFEN;
