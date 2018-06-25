import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import { renderChessPieces } from './RenderPieces';

PhantomPiece.propTypes = {
  width: PropTypes.number,
  phantomPieceValue: PropTypes.string,
  defaultPieces: PropTypes.object,
  pieces: PropTypes.object
};

function PhantomPiece({ pieces, width, defaultPieces, phantomPieceValue }) {
  return renderChessPieces(
    {
      ...{ pieces, width, defaultPieces },
      ...{ piece: phantomPieceValue }
    },
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
  zIndex: 0
});
