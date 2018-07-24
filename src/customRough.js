import rough from 'roughjs';

export const roughSquare = ({ squareElement, squareWidth }) => {
  let rc = rough.svg(squareElement);
  const chessSquare = rc.rectangle(0, 0, squareWidth, squareWidth, {
    roughness: 0.8,
    fill: '#b58863',
    bowing: 2
  });
  squareElement.appendChild(chessSquare);
};
