import React, { Component } from 'react';

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
              boardId={context.id}
            >
              {({ square, squareColor, col, row, alpha }) => {
                return (
                  <Square
                    key={`${col}${row}`}
                    width={context.width}
                    square={square}
                    squareColor={squareColor}
                    setSquareCoordinates={this.setSquareCoordinates}
                    lightSquareStyle={context.lightSquareStyle}
                    darkSquareStyle={context.darkSquareStyle}
                    roughSquare={context.roughSquare}
                    onMouseOverSquare={context.onMouseOverSquare}
                    onMouseOutSquare={context.onMouseOutSquare}
                    onDragOverSquare={context.onDragOverSquare}
                    dropSquareStyle={context.dropSquareStyle}
                    id={context.id}
                    screenWidth={context.screenWidth}
                    screenHeight={context.screenHeight}
                    squareStyles={context.squareStyles}
                    onSquareClick={context.onSquareClick}
                    onSquareRightClick={context.onSquareRightClick}
                    wasSquareClicked={context.wasSquareClicked}
                  >
                    {this.hasPiece(context.currentPosition, square) ? (
                      <Piece
                        pieces={context.pieces}
                        square={square}
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
                        wasManuallyDropped={context.wasManuallyDropped}
                        phantomPiece={context.phantomPiece}
                        onPieceClick={context.onPieceClick}
                        wasSquareClicked={context.wasSquareClicked}
                        allowDrag={context.allowDrag}
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
                        allowDrag={context.allowDrag}
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
