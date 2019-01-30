import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { ItemTypes } from './helpers';

class Square extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func,
    width: PropTypes.number,
    squareColor: PropTypes.oneOf(['white', 'black']),
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    isOver: PropTypes.bool,
    square: PropTypes.string,
    setSquareCoordinates: PropTypes.func,
    lightSquareStyle: PropTypes.object,
    darkSquareStyle: PropTypes.object,
    roughSquare: PropTypes.func,
    onMouseOverSquare: PropTypes.func,
    onMouseOutSquare: PropTypes.func,
    dropSquareStyle: PropTypes.object,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    squareStyles: PropTypes.object,
    onDragOverSquare: PropTypes.func,
    onSquareClick: PropTypes.func,
    wasSquareClicked: PropTypes.func,
    onSquareRightClick: PropTypes.func
  };

  componentDidMount() {
    const { square, setSquareCoordinates, width, roughSquare } = this.props;
    roughSquare({ squareElement: this.roughSquareSvg, squareWidth: width / 8 });

    const { x, y } = this[square].getBoundingClientRect();
    setSquareCoordinates(x, y, square);
  }

  componentDidUpdate(prevProps) {
    const {
      screenWidth,
      screenHeight,
      square,
      setSquareCoordinates
    } = this.props;

    const didScreenSizeChange =
      prevProps.screenWidth !== screenWidth ||
      prevProps.screenHeight !== screenHeight;

    if (didScreenSizeChange) {
      const { x, y } = this[square].getBoundingClientRect();
      setSquareCoordinates(x, y, square);
    }
  }

  onClick = () => {
    this.props.wasSquareClicked(true);
    this.props.onSquareClick(this.props.square);
  };

  render() {
    const {
      connectDropTarget,
      width,
      squareColor,
      children,
      square,
      roughSquare,
      onMouseOverSquare,
      onMouseOutSquare,
      squareStyles,
      onDragOverSquare,
      onSquareRightClick
    } = this.props;

    return connectDropTarget(
      <div
        data-testid={`${squareColor}-square`}
        data-squareid={square}
        ref={ref => (this[square] = ref)}
        style={defaultSquareStyle(this.props)}
        onMouseOver={() => onMouseOverSquare(square)}
        onMouseOut={() => onMouseOutSquare(square)}
        onDragEnter={() => onDragOverSquare(square)}
        onClick={() => this.onClick()}
        onContextMenu={e => {
          e.preventDefault();
          onSquareRightClick(square);
        }}
      >
        <div
          style={{
            ...size(width),
            ...center,
            ...(squareStyles[square] && squareStyles[square])
          }}
        >
          {roughSquare.length ? (
            <div style={center}>
              {children}
              <svg
                style={{
                  ...size(width),
                  position: 'absolute',
                  display: 'block'
                }}
                ref={ref => (this.roughSquareSvg = ref)}
              />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    );
  }
}

const squareTarget = {
  drop(props, monitor) {
    return {
      target: props.square,
      board: props.id,
      piece: monitor.getItem().piece,
      source: monitor.getItem().source
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget(ItemTypes.PIECE, squareTarget, collect)(Square);

const defaultSquareStyle = props => {
  const {
    width,
    squareColor,
    isOver,
    darkSquareStyle,
    lightSquareStyle,
    dropSquareStyle
  } = props;

  return {
    ...{
      ...size(width),
      ...center,
      ...(squareColor === 'black' ? darkSquareStyle : lightSquareStyle),
      ...(isOver && dropSquareStyle)
    }
  };
};

const center = {
  display: 'flex',
  justifyContent: 'center'
};

const size = width => ({
  width: width / 8,
  height: width / 8
});
