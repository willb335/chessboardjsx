import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Chessboard from '../index';

test('renders pieces when position is "start"', () => {
  const { getByTestId } = render(<Chessboard position="start" />);
  const whiteQueen = getByTestId('wQ-d1');
  const blackKnight = getByTestId('bN-b8');

  expect(whiteQueen).toBeInTheDOM();
  expect(blackKnight).toBeInTheDOM();
});

test('renders no pieces when position is not provided', () => {
  const { queryByTestId } = render(<Chessboard position="" />);

  const whiteQueen = queryByTestId('wQ-d1');
  const blackKnight = queryByTestId('bN-b8');

  expect(whiteQueen).not.toBeInTheDOM();
  expect(blackKnight).not.toBeInTheDOM();
});

test('renders a sparePiece sparePieces is true', () => {
  const { queryByTestId } = render(
    <Chessboard position="start" sparePieces={true} />
  );

  const whiteQueen = queryByTestId('spare-wQ');
  const blackRook = queryByTestId('spare-bR');
  const blackPawn = queryByTestId('spare-bP');

  expect(whiteQueen).toBeInTheDOM();
  expect(blackRook).toBeInTheDOM();
  expect(blackPawn).toBeInTheDOM();
});

test('renders correct pieces when given a position object', () => {
  const { queryByTestId } = render(
    <Chessboard
      position={{
        d6: 'bK',
        d4: 'wP',
        e4: 'wK'
      }}
    />
  );
  const whiteQueen = queryByTestId('wK-e4');
  const blackRook = queryByTestId('bR-e1');
  const blackKing = queryByTestId('bK-d6');
  const blackBishop = queryByTestId('bB-f3');

  expect(whiteQueen).toBeInTheDOM();
  expect(blackRook).not.toBeInTheDOM();
  expect(blackKing).toBeInTheDOM();
  expect(blackBishop).not.toBeInTheDOM();
});
