import React, { Component, Fragment } from 'react';

import Piece from './Piece';
import Square from './Square';
import Notation from './Notation';
import Chessboard from './index';
import PhantomPiece from './PhantomPiece';
import Row from './Row';

class Board extends Component {
  setSquareCoordinates = (x, y, square) =>
    this.setState({ [square]: { x, y } });

  getSquareCoordinates = (sourceSquare, targetSquare) => ({
    sourceSquare: this.state[sourceSquare],
    targetSquare: this.state[targetSquare]
  });

  showPhantom = ({ square, targetSquare, phantomPiece }) => {
    const isActivePiece = (square, targetSquare) =>
      targetSquare && targetSquare === square;

    return (
      phantomPiece &&
      phantomPiece[targetSquare] &&
      isActivePiece(square, targetSquare)
    );
  };

  hasPiece = (currentPosition, square) =>
    currentPosition &&
    Object.keys(currentPosition) &&
    Object.keys(currentPosition).includes(square);

  render() {
    return (
      <Chessboard.Consumer>
        {context => {
          return (
            <Row
              width={context.width}
              boardStyle={context.boardStyle}
              orientation={context.orientation}
            >
              {({ square, squareColor, col, row, alpha }) => {
                return (
                  <Fragment key={`${col}${row}`}>
                    <Square
                      key={col.toString()}
                      width={context.width}
                      square={square}
                      squareColor={squareColor}
                      setSquareCoordinates={this.setSquareCoordinates}
                      lightSquareStyle={context.lightSquareStyle}
                      darkSquareStyle={context.darkSquareStyle}
                      roughSquare={context.roughSquare}
                      selectedSquares={context.selectedSquares}
                      onMouseOverSquare={context.onMouseOverSquare}
                      onMouseOutSquare={context.onMouseOutSquare}
                      onHoverSquareStyle={context.onHoverSquareStyle}
                      selectedSquareStyle={context.selectedSquareStyle}
                      id={context.id}
                      screenWidth={context.screenWidth}
                      screenHeight={context.screenHeight}
                    >
                      {this.hasPiece(context.currentPosition, square) ? (
                        <Piece
                          pieces={context.pieces}
                          currentSquare={square}
                          piece={context.currentPosition[square]}
                          width={context.width}
                          setPosition={context.setPosition}
                          dropOffBoard={context.dropOffBoard}
                          getSquareCoordinates={this.getSquareCoordinates}
                          draggable={context.draggable}
                          onDrop={context.onDrop}
                          sourceSquare={context.sourceSquare}
                          targetSquare={context.targetSquare}
                          waitForTransition={context.waitForTransition}
                          transitionDuration={context.transitionDuration}
                          orientation={context.orientation}
                          id={context.id}
                          setTouchState={context.setTouchState}
                          renderPieces={context.renderPieces}
                          wasManuallyDropped={context.wasManuallyDropped}
                        />
                      ) : null}

                      {this.showPhantom({
                        square,
                        targetSquare: context.targetSquare,
                        phantomPiece: context.phantomPiece
                      }) && (
                        <PhantomPiece
                          width={context.width}
                          phantomPieceValue={
                            context.phantomPiece[context.targetSquare]
                          }
                          pieces={context.pieces}
                          showNotation={context.showNotation}
                        />
                      )}

                      {context.showNotation && (
                        <Notation
                          row={row}
                          col={col}
                          alpha={alpha}
                          orientation={context.orientation}
                          width={context.width}
                          lightSquareStyle={context.lightSquareStyle}
                          darkSquareStyle={context.darkSquareStyle}
                        />
                      )}
                    </Square>
                  </Fragment>
                );
              }}
            </Row>
          );
        }}
      </Chessboard.Consumer>
    );
  }
}

export default Board;
