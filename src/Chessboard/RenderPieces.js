/* eslint react/prop-types: 0 */
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
    return typeof url === 'string' && url.includes(format);
  });
};

export const renderChessPieces = (
  { currentSquare, piece, width, pieces },
  { imgStyles = {}, svgStyles = {} } = {}
) => {
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
  }

  return (
    <div data-testid={`${piece}-${currentSquare}`} style={svgStyles}>
      <svg viewBox={`1 1 43 43`}>
        <g>{pieces[piece]}</g>
      </svg>
    </div>
  );
};

export function renderPieces({
  currentSquare,
  targetSquare,
  waitForTransition,
  getSquareCoordinates,
  piece,
  width,
  pieces,
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
    { currentSquare, piece, pieces, width },
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
