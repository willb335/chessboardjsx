import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Chess from 'chess.js';

class HumanVsRandom extends Component {
  static propTypes = { children: PropTypes.func };

  state = { fen: 'start', myPosition: {} };

  componentDidMount() {
    this.game = new Chess();
  }

  getPosition = position => this.setState({ myPosition: position });

  makeRandomMove = () => {
    let possibleMoves = this.game.moves();

    // exit if the game is over
    if (
      this.game.game_over() === true ||
      this.game.in_draw() === true ||
      possibleMoves.length === 0
    )
      return;

    let randomIndex = Math.floor(Math.random() * possibleMoves.length);
    this.game.move(possibleMoves[randomIndex]);
    this.setState({ fen: this.game.fen() });
  };

  onDrop = (source, target) => {
    // see if the move is legal
    let move = this.game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    this.setState({ fen: this.game.fen() });

    // make random legal move for black
    window.setTimeout(this.makeRandomMove, 1000);
  };

  render() {
    const { fen, myPosition } = this.state;
    return this.props.children({
      position: fen,
      onDrop: this.onDrop,
      getPosition: this.getPosition,
      darkSquareStyle: Object.keys(myPosition).includes('e4')
        ? { backgroundColor: 'orange' }
        : { backgroundColor: '#10a8c8' }
    });
  }
}

export default HumanVsRandom;
