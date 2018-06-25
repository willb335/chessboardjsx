import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

Notation.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  alpha: PropTypes.array,
  orientation: PropTypes.string,
  width: PropTypes.number,
  lightSquareStyle: PropTypes.object,
  darkSquareStyle: PropTypes.object
};

const getRow = (orientation, row) =>
  orientation === 'white' ? row + 1 : row - 1;
const getColumn = (orientation, alpha, col) =>
  orientation === 'black' ? alpha[7 - col] : alpha[col];

function Notation({
  row,
  col,
  alpha,
  orientation,
  width,
  lightSquareStyle,
  darkSquareStyle
}) {
  const whiteColor = lightSquareStyle.backgroundColor;
  const blackColor = darkSquareStyle.backgroundColor;

  const isBottomLeftSquare =
    col === 0 &&
    ((orientation === 'white' && row === 0) ||
      (orientation === 'black' && row === 9));
  const isRow = col === 0;
  const isColumn =
    (orientation === 'white' && row === 0) ||
    (orientation === 'black' && row === 9);

  if (isBottomLeftSquare) {
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

  if (isRow) {
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

  if (isColumn) {
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
  return null;
}

export default Notation;

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
  position: 'absolute',
  bottom: width / 8 / 40,
  right: width / 8 / 20
});

const numericStyle = width => ({
  position: 'absolute',
  top: width / 8 / 40,
  left: width / 8 / 40
});

const notationStyle = {
  fontFamily: `${'Helvetica Neue'}, Helvetica, Arial, sans-serif`,
  fontSize: '14px'
};
