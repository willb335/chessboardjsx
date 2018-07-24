import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

const getRow = (orientation, row) =>
  orientation === 'white' ? row + 1 : row - 1;

const getColumn = (orientation, alpha, col) =>
  orientation === 'black' ? alpha[7 - col] : alpha[col];

class Notation extends PureComponent {
  static propTypes = {
    row: PropTypes.number,
    col: PropTypes.number,
    alpha: PropTypes.array,
    orientation: PropTypes.string,
    width: PropTypes.number,
    lightSquareStyle: PropTypes.object,
    darkSquareStyle: PropTypes.object
  };

  render() {
    const {
      row,
      col,
      orientation,
      lightSquareStyle,
      darkSquareStyle
    } = this.props;

    const whiteColor = lightSquareStyle.backgroundColor;
    const blackColor = darkSquareStyle.backgroundColor;

    const isRow = col === 0;
    const isColumn =
      (orientation === 'white' && row === 0) ||
      (orientation === 'black' && row === 9);
    const isBottomLeftSquare = isRow && isColumn;

    if (isBottomLeftSquare) {
      return renderBottomLeft(this.props, { whiteColor });
    }

    if (isColumn) {
      return renderLetters(this.props, {
        whiteColor,
        blackColor
      });
    }

    if (isRow) {
      return renderNumbers(this.props, {
        whiteColor,
        blackColor,
        isRow,
        isBottomLeftSquare
      });
    }

    return null;
  }
}

export default Notation;

/* eslint react/prop-types: 0 */
function renderBottomLeft(
  { orientation, row, width, alpha, col },
  { whiteColor }
) {
  return (
    <Fragment>
      <div
        data-testid={`bottom-left-${getRow(orientation, row)}`}
        style={{
          ...notationStyle,
          ...{ fontSize: width / 48, color: whiteColor },
          ...numericStyle(width)
        }}
      >
        {getRow(orientation, row)}
      </div>
      <div
        data-testid={`bottom-left-${getColumn(orientation, alpha, col)}`}
        style={{
          ...notationStyle,
          ...{ fontSize: width / 48, color: whiteColor },
          ...alphaStyle(width)
        }}
      >
        {getColumn(orientation, alpha, col)}
      </div>
    </Fragment>
  );
}

function renderLetters(
  { orientation, width, alpha, col },
  { whiteColor, blackColor }
) {
  return (
    <div
      data-testid={`column-${getColumn(orientation, alpha, col)}`}
      style={{
        ...notationStyle,
        ...columnStyle({ col, width, blackColor, whiteColor }),
        ...alphaStyle(width)
      }}
    >
      {getColumn(orientation, alpha, col)}
    </div>
  );
}

function renderNumbers(
  { orientation, row, width },
  { whiteColor, blackColor, isRow, isBottomLeftSquare }
) {
  return (
    <div
      style={{
        ...notationStyle,
        ...rowStyle({
          row,
          width,
          blackColor,
          whiteColor,
          orientation,
          isBottomLeftSquare,
          isRow
        }),
        ...numericStyle(width)
      }}
    >
      {getRow(orientation, row)}
    </div>
  );
}

const columnStyle = ({ col, width, blackColor, whiteColor }) => ({
  fontSize: width / 48,
  color: col % 2 !== 0 ? blackColor : whiteColor
});

const rowStyle = ({
  row,
  width,
  blackColor,
  whiteColor,
  orientation,
  isBottomLeftSquare,
  isRow
}) => {
  return {
    fontSize: width / 48,
    color:
      orientation === 'black'
        ? isRow && !isBottomLeftSquare && row % 2 === 0
          ? blackColor
          : whiteColor
        : isRow && !isBottomLeftSquare && row % 2 !== 0
          ? blackColor
          : whiteColor
  };
};

const alphaStyle = width => ({
  alignSelf: 'flex-end',
  paddingLeft: width / 8 - width / 48
});

const numericStyle = width => ({
  alignSelf: 'flex-start',
  paddingRight: width / 8 - width / 48
});

const notationStyle = {
  fontFamily: 'Helvetica Neue',
  zIndex: 3,
  position: 'absolute'
};
