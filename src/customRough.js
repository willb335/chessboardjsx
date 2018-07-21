import rough from 'roughjs';

export const roughSquare = (element, squareWidth) => {
  let rc = rough.svg(element);
  const chessSquare = rc.rectangle(0, 0, squareWidth, squareWidth, {
    roughness: 0.8,
    fill: '#b58863',
    bowing: 2
  });
  element.appendChild(chessSquare);
};
