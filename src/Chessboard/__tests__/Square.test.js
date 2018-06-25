import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Chessboard from '../index';

afterEach(cleanup);

test('checks if the square is in the DOM', () => {
  const { getByTestId } = render(
    <Chessboard lightSquareStyle={{ backgroundColor: 'green' }} />
  );

  const whiteSquare = getByTestId('white-square');

  expect(whiteSquare).toHaveAttribute('style');
  expect(whiteSquare).toBeInTheDOM();
});
