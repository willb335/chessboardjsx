import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { ItemTypes } from './helpers';

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
    setTouchState: PropTypes.func,
    renderPieces: PropTypes.func
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
      renderPieces,
      sourceSquare
    } = this.props;

    return connectDragSource(
      renderPieces &&
        renderPieces({
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
        return onDrop(props.currentSquare, dropResults.target);
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
    isDragging: monitor.isDragging(),
    dropTarget: monitor.getDropResult()
  };
}

export default DragSource(ItemTypes.PIECE, pieceSource, collect)(Piece);
