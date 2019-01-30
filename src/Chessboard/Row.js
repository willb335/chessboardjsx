import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { COLUMNS } from './helpers';

class Row extends Component {
  static propTypes = {
    width: PropTypes.number,
    orientation: PropTypes.string,
    boardStyle: PropTypes.object,
    children: PropTypes.func,
    boardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  render() {
    const { width, boardStyle, orientation, children, boardId } = this.props;
    let alpha = COLUMNS;
    let row = 8;
    let squareColor = 'white';

    if (orientation === 'black') row = 1;

    return (
      <div
        style={{ ...boardStyles(width), ...boardStyle }}
        data-boardid={boardId}
      >
        {[...Array(8)].map((_, r) => {
          row = orientation === 'black' ? row + 1 : row - 1;

          return (
            <div key={r.toString()} style={rowStyles(width)}>
              {[...Array(8)].map((_, col) => {
                let square =
                  orientation === 'black'
                    ? alpha[7 - col] + (row - 1)
                    : alpha[col] + (row + 1);

                if (col !== 0) {
                  squareColor = squareColor === 'black' ? 'white' : 'black';
                }
                return children({ square, squareColor, col, row, alpha });
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Row;

const boardStyles = width => ({
  width,
  height: width,
  cursor: 'default'
});

const rowStyles = width => ({
  display: 'flex',
  flexWrap: 'nowrap',
  width
});
