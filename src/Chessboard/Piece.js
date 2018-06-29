import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { ItemTypes } from './helpers';
import './styles/animations.css';

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
    animationOnDrop: PropTypes.string,
    transitionDuration: PropTypes.number,
    defaultPieces: PropTypes.objectOf(PropTypes.object),
    sourceSquare: PropTypes.string,
    targetSquare: PropTypes.string,
    waitForTransition: PropTypes.bool,
    manualDrop: PropTypes.bool,
    dropSquare: PropTypes.string,
    setTouchState: PropTypes.func,
    renderPieces: PropTypes.func,
    pieces: PropTypes.object
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
      pieces,
      piece,
      width,
      defaultPieces,
      transitionDuration,
      isDragging,
      connectDragSource,
      renderPieces,
      manualDrop,
      dropSquare,
      animationOnDrop,
      sourceSquare
    } = this.props;

    return connectDragSource(
      <div
        data-testid={`${piece}-${currentSquare}`}
        className={getClassNames({
          manualDrop,
          currentSquare,
          dropSquare,
          animationOnDrop
        })}
      >
        {renderPieces &&
          renderPieces({
            currentSquare,
            targetSquare,
            waitForTransition,
            getSquareCoordinates,
            pieces,
            piece,
            width,
            defaultPieces,
            transitionDuration,
            isDragging,
            sourceSquare
          })}
      </div>
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
    const dropResults = monitor.getDropResult();
    const didDrop = monitor.didDrop();

    if (!didDrop && props.dropOffBoard === 'trash') {
      props.setPosition(props.piece, props.currentSquare);
      return;
    }

    const board = monitor.getItem().board;
    const dropBoard = dropResults && dropResults.board;

    if (board === dropBoard && didDrop) {
      if (props.onDrop) {
        props.setAnimation(dropResults.target);
        props.onDrop(props.currentSquare, dropResults.target);
        return;
      }
      props.setAnimation(dropResults.target);
      props.setPosition(props.piece, props.currentSquare, dropResults.target);
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

const getClassNames = ({
  manualDrop,
  currentSquare,
  dropSquare,
  animationOnDrop
}) => {
  return manualDrop && currentSquare === dropSquare ? animationOnDrop : '';
};
