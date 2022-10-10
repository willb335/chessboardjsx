import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

import { renderChessPiece } from './Piece';

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    width: PropTypes.number,
    pieces: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wasPieceTouched: PropTypes.bool,
    sourceSquare: PropTypes.string
  };

  render() {
    const {
      isDragging,
      width,
      item,
      id,
      currentOffset,
      initialOffset,
      wasPieceTouched,
      pieces,
      sourceSquare
    } = this.props;

    let dependOnCursorPosition = currentOffset ? {
      x: currentOffset.x,
      y: currentOffset.y
    }
      : null

    if (item && currentOffset && initialOffset) {
      const squareElement = document.querySelector(`[data-squareid=${item.source}]`)
      if (squareElement) {
        const squareElementDOMRect = squareElement.getBoundingClientRect()
        const squareWidth = width / 8
  
        let dx = (squareWidth / 2) - (squareElementDOMRect.right - initialOffset.x)
        let dy = (squareWidth / 2) - (squareElementDOMRect.bottom - initialOffset.y)
  
        dependOnCursorPosition = {
          x: currentOffset.x + dx,
          y: currentOffset.y + dy
        }
      }
    }

    return isDragging && item.board === id ? (
      <div style={layerStyles}>
        <div style={getItemStyle(dependOnCursorPosition, wasPieceTouched)}>
          {renderChessPiece({
            width,
            pieces,
            piece: item.piece,
            isDragging,
            customDragLayerStyles: { opacity: 1 },
            sourceSquare
          })}
        </div>
      </div>
    ) : null;
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    initialOffset: monitor.getInitialClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 10,
  left: 0,
  top: 0
};

const getItemStyle = (currentOffset, wasPieceTouched) => {
  if (!currentOffset) return { display: 'none' };

  let { x, y } = currentOffset;
  const transform = wasPieceTouched
    ? `translate(${x}px, ${y + -25}px) scale(2)`
    : `translate(${x}px, ${y}px)`;

  return { transform };
};
