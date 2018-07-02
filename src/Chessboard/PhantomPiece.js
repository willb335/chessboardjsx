import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import { renderChessPieces } from './RenderPieces';

PhantomPiece.propTypes = {
  width: PropTypes.number,
  phantomPieceValue: PropTypes.string,
  pieces: PropTypes.object
};

function PhantomPiece({ width, pieces, phantomPieceValue }) {
  return renderChessPieces(
    { width, pieces, piece: phantomPieceValue },
    {
      imgStyles: phantomPieceStyles(width),
      svgStyles: phantomPieceStyles(width)
    }
  );
}

export default PhantomPiece;

const phantomPieceStyles = width => ({
  position: 'absolute',
  width: width / 8,
  height: width / 8,
  zIndex: 1
});
