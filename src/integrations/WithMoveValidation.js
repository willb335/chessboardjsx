import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Chess from 'chess.js';

import Chessboard from '../Chessboard';

class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };

  state = {
    fen: 'start',
    // square styles for active drop squares
    dropSquareStyle: {},
    // custom square styles
    squareStyles: {},
    // square with the currently clicked piece
    pieceSquare: '',
    // currently clicked square
    square: ''
  };

  componentDidMount() {
    this.game = new Chess();
  }

  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare }) => ({
      squareStyles: { [pieceSquare]: { backgroundColor: 'DarkTurquoise' } }
    }));
  };

  // show possible moves
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                'radial-gradient(circle, #fffc00 36%, transparent 40%)',
              borderRadius: '50%'
            }
          },
          ...{ [this.state.pieceSquare]: { backgroundColor: 'DarkTurquoise' } }
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    this.removeHighlightSquare();

    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    this.setState({ fen: this.game.fen() });
  };

  onMouseOverSquare = square => {
    // get list of possible moves for this square
    let moves = this.game.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = square => this.removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle:
        square === 'e4' || square === 'd4' || square === 'e5' || square === 'd5'
          ? { boxShadow: 'inset 0 0 1px 8px green' }
          : { boxShadow: 'inset 0 0 1px 4px yellow' }
    });
  };

  onSquareClick = square => {
    this.setState({
      squareStyles: { [square]: { backgroundColor: 'DarkTurquoise' } },
      pieceSquare: square
    });

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    this.setState({ fen: this.game.fen() });
  };

  render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick
    });
  }
}

export default function WithMoveValidation() {
  return (
    <div>
      <HumanVsHuman>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick
        }) => (
          <Chessboard
            id="humanVsHuman"
            calcWidth={screenWidth => (screenWidth < 500 ? 350 : 480)}
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: '5px',
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}
