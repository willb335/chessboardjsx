import React from 'react';

const isActivePiece = (currentSquare, targetSquare) =>
  targetSquare && targetSquare === currentSquare;

const getTransitionCoordinates = ({
  getSquareCoordinates,
  sourceSq,
  targetSq
}) => {
  const transitionCoordinates = getSquareCoordinates(sourceSq, targetSq);
  const { sourceSquare, targetSquare } = transitionCoordinates;

  return `translate(${sourceSquare.x - targetSquare.x}px, ${sourceSquare.y -
    targetSquare.y}px)`;
};

const getTranslation = ({
  waitForTransition,
  currentSquare,
  targetSquare,
  sourceSquare,
  getSquareCoordinates
}) => {
  return (
    isActivePiece(currentSquare, targetSquare) &&
    waitForTransition &&
    getTransitionCoordinates({
      getSquareCoordinates,
      sourceSq: sourceSquare,
      targetSq: targetSquare
    })
  );
};

const isImage = (url, imageFormats) => {
  return imageFormats.find(format => {
    return url.includes(format) && typeof url === 'string';
  });
};

const areCustomPieces = (pieces, piece) =>
  Object.keys(pieces).length && Object.keys(pieces).includes(piece);

export const renderChessPieces = (
  { currentSquare, pieces, piece, width, defaultPieces },
  { imgStyles = {}, svgStyles = {} } = {}
) => {
  if (areCustomPieces(pieces, piece)) {
    if (isImage(pieces[piece], ['png', 'jpg', 'jpeg'])) {
      return (
        <div data-testid={`${piece}-${currentSquare}`} style={imgStyles}>
          <img
            style={{ width: width / 8, height: width / 8 }}
            src={pieces[piece]}
            alt={`${piece}`}
          />
        </div>
      );
    } else
      return (
        <div data-testid={`${piece}-${currentSquare}`} style={svgStyles}>
          <svg viewBox={`-3 -3 50 50`}>
            <g>{pieces[piece]}</g>
          </svg>
        </div>
      );
  } else
    return renderDefaultPieces(
      { currentSquare, piece, defaultPieces },
      svgStyles
    );
};

const renderDefaultPieces = (
  { currentSquare, piece, defaultPieces },
  svgStyles
) => {
  if (defaultPieces[piece]) {
    return (
      <div data-testid={`${piece}-${currentSquare}`} style={svgStyles}>
        <svg viewBox={`1 1 42 42`}>
          <g>{defaultPieces[piece]}</g>
        </svg>
      </div>
    );
  } else return null;
};

export function renderPieces({
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
}) {
  const imgStyleParams = {
    isDragging,
    transitionDuration,
    waitForTransition,
    currentSquare,
    targetSquare,
    sourceSquare,
    getSquareCoordinates
  };

  return renderChessPieces(
    {
      currentSquare,
      pieces,
      piece,
      defaultPieces,
      width
    },
    {
      imgStyles: imgStyles(imgStyleParams, getTranslation),
      svgStyles: {
        ...imgStyles(imgStyleParams, getTranslation),
        ...{ width: width / 8, height: width / 8 }
      }
    }
  );
}

const imgStyles = (
  {
    isDragging,
    transitionDuration,
    waitForTransition,
    currentSquare,
    targetSquare,
    sourceSquare,
    getSquareCoordinates
  },
  getTranslation
) => ({
  opacity: isDragging ? 0 : 1,
  transform: getTranslation({
    waitForTransition,
    currentSquare,
    targetSquare,
    sourceSquare,
    getSquareCoordinates
  }),
  transition: `transform ${transitionDuration}ms`,
  zIndex: 5
});
