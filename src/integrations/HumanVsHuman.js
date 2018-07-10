import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Chess from 'chess.js';

const game = new Chess();

class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };

  state = { fen: 'start', selectedSquares: [], myPosition: {} };

  removeHighlightSquare = () => {
    this.setState({ selectedSquares: [] });
  };

  highlightSquare = (sourceSquare, squares = []) => {
    this.setState(() => ({
      selectedSquares: [sourceSquare, ...squares]
    }));
  };

  getPosition = position => this.setState({ myPosition: position });

  onDrop = (source, target) => {
    this.removeHighlightSquare();

    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    this.setState({ fen: game.fen() });
  };

  onMouseOverSquare = square => {
    // get list of possible moves for this square
    var moves = game.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the square they moused over
    // highlight the possible squares for this piece
    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }
    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = () => {
    this.removeHighlightSquare();
  };

  render() {
    const { fen, selectedSquares, myPosition } = this.state;

    return this.props.children({
      position: fen,
      selectedSquares,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      getPosition: this.getPosition,
      darkSquareStyle:
        Object.keys(myPosition).includes('e4') ||
        Object.keys(myPosition).includes('d4')
          ? { backgroundColor: 'tomato' }
          : { backgroundColor: 'lightskyblue' }
    });
  }
}

export default HumanVsHuman;
