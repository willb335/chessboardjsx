import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

import { renderChessPieces } from './RenderPieces';

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    width: PropTypes.number,
    defaultPieces: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wasPieceTouched: PropTypes.bool,
    pieces: PropTypes.object
  };

  render() {
    const {
      isDragging,
      width,
      item,
      defaultPieces,
      id,
      currentOffset,
      wasPieceTouched,
      pieces
    } = this.props;

    return isDragging && item.board === id ? (
      <div style={layerStyles}>
        <div style={getItemStyles(currentOffset, wasPieceTouched)}>
          {renderChessPieces(
            {
              ...{ pieces, width, defaultPieces },
              ...{ piece: this.props.item.piece }
            },
            { svgStyles: { width: width / 8, height: width / 8 } }
          )}
        </div>
      </div>
    ) : null;
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 500,
  left: 0,
  top: 0
};

const getItemStyles = (currentOffset, wasPieceTouched) => {
  if (!currentOffset) return { display: 'none' };

  let { x, y } = currentOffset;
  const transform = wasPieceTouched
    ? `translate(${x}px, ${y + -25}px) scale(2)`
    : `translate(${x}px, ${y}px)`;

  return { transform };
};
