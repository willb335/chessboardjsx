import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { ItemTypes } from './helpers';

/* eslint react/prop-types: 0 */
export const renderChessPiece = ({
  currentSquare,
  targetSquare,
  waitForTransition,
  getSquareCoordinates,
  piece,
  width,
  pieces,
  transitionDuration,
  isDragging,
  sourceSquare,
  customDragLayerStyles = {},
  phantomPieceStyles = {}
}) => {
  const renderChessPieceArgs = {
    // set the width and height to the square's width and height
    width: width / 8,
    height: width / 8,
    isDragging,
    // undefined when dragging
    currentSquare,
    sourceSquare
  };

  return (
    <div
      data-testid={`${piece}-${currentSquare}`}
      style={{
        ...pieceStyles(
          {
            isDragging,
            transitionDuration,
            waitForTransition,
            currentSquare,
            targetSquare,
            sourceSquare,
            getSquareCoordinates
          },
          getTranslation
        ),
        ...phantomPieceStyles,
        ...customDragLayerStyles
      }}
    >
      {typeof pieces[piece] === 'function' ? (
        pieces[piece](renderChessPieceArgs)
      ) : (
        <svg viewBox={`1 1 43 43`} width={width / 8} height={width / 8}>
          <g>{pieces[piece]}</g>
        </svg>
      )}
    </div>
  );
};

class Piece extends Component {
  static propTypes = {
    piece: PropTypes.string,
    currentSquare: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.number,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    connectDragPreview: PropTypes.func,
    dropOffBoard: PropTypes.string,
    getSquareCoordinates: PropTypes.func,
    onDrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    transitionDuration: PropTypes.number,
    pieces: PropTypes.object,
    sourceSquare: PropTypes.string,
    targetSquare: PropTypes.string,
    waitForTransition: PropTypes.bool,
    setTouchState: PropTypes.func
  };

  componentDidMount() {
    window.addEventListener('touchstart', this.props.setTouchState);

    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', this.props.setTouchState);
  }

  render() {
    const {
      currentSquare,
      targetSquare,
      waitForTransition,
      getSquareCoordinates,
      piece,
      width,
      pieces,
      transitionDuration,
      isDragging,
      connectDragSource,
      sourceSquare
    } = this.props;

    return connectDragSource(
      renderChessPiece({
        currentSquare,
        targetSquare,
        waitForTransition,
        getSquareCoordinates,
        piece,
        width,
        pieces,
        transitionDuration,
        isDragging,
        sourceSquare
      })
    );
  }
}

const pieceSource = {
  canDrag(props) {
    return props.draggable;
  },
  beginDrag(props) {
    return {
      piece: props.piece,
      sourceSquare: props.currentSquare,
      board: props.id
    };
  },
  endDrag(props, monitor) {
    const {
      setPosition,
      dropOffBoard,
      piece,
      currentSquare,
      onDrop,
      wasManuallyDropped
    } = props;
    const dropResults = monitor.getDropResult();
    const didDrop = monitor.didDrop();

    // trash piece when dropped off board
    if (!didDrop && dropOffBoard === 'trash') {
      return setPosition(piece, currentSquare);
    }

    const board = monitor.getItem().board;
    const dropBoard = dropResults && dropResults.board;

    // check if target board is source board
    if (board === dropBoard && didDrop) {
      if (onDrop.length) {
        wasManuallyDropped(true);
        // execute user's logic
        return onDrop(props.currentSquare, dropResults.target, piece);
      }
      // set new position

      setPosition(piece, currentSquare, dropResults.target);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
    // dropTarget: monitor.getDropResult()
  };
}

export default DragSource(ItemTypes.PIECE, pieceSource, collect)(Piece);

const isActivePiece = (currentSquare, targetSquare) =>
  targetSquare && targetSquare === currentSquare;

const getTransitionCoordinates = ({
  getSquareCoordinates,
  sourceSq,
  targetSq
}) => {
  const transitionCoordinates = getSquareCoordinates(sourceSq, targetSq);
  const { sourceSquare, targetSquare } = transitionCoordinates;

  return `translate(${sourceSquare.x - targetSquare.x}px, ${sourceSquare.y -
    targetSquare.y}px)`;
};

const getTranslation = ({
  waitForTransition,
  currentSquare,
  targetSquare,
  sourceSquare,
  getSquareCoordinates
}) => {
  return (
    isActivePiece(currentSquare, targetSquare) &&
    waitForTransition &&
    getTransitionCoordinates({
      getSquareCoordinates,
      sourceSq: sourceSquare,
      targetSq: targetSquare
    })
  );
};

const pieceStyles = (
  {
    isDragging,
    transitionDuration,
    waitForTransition,
    currentSquare,
    targetSquare,
    sourceSquare,
    getSquareCoordinates
  },
  getTranslation
) => ({
  opacity: isDragging ? 0 : 1,
  transform: getTranslation({
    waitForTransition,
    currentSquare,
    targetSquare,
    sourceSquare,
    getSquareCoordinates
  }),
  transition: `transform ${transitionDuration}ms`,
  zIndex: 5
});
