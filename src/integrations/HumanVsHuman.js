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

  onDrop = ({ sourceSquare, targetSquare, piece }) => {
    console.log('source', sourceSquare, 'target', targetSquare, 'piece', piece);
    this.removeHighlightSquare();

    // see if the move is legal
    var move = game.move({
      from: sourceSquare,
      to: targetSquare,
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
    const { fen, selectedSquares } = this.state;

    const squareStyles = selectedSquares.reduce((a, c) => {
      return {
        ...a,
        ...{
          [c]: {
            background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
            borderRadius: '50%'
          }
        }
      };
    }, {});

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop
    });
  }
}

export default HumanVsHuman;
