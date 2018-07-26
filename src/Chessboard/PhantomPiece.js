import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import { renderChessPiece } from './Piece';

PhantomPiece.propTypes = {
  width: PropTypes.number,
  phantomPieceValue: PropTypes.string,
  pieces: PropTypes.object,
  allowDrag: PropTypes.func
};

function PhantomPiece({ width, pieces, phantomPieceValue, allowDrag }) {
  return renderChessPiece({
    width,
    pieces,
    piece: phantomPieceValue,
    phantomPieceStyles: phantomPieceStyles(width),
    allowDrag
  });
}

export default PhantomPiece;

const phantomPieceStyles = width => ({
  position: 'absolute',
  width: width / 8,
  height: width / 8,
  zIndex: 1
});
