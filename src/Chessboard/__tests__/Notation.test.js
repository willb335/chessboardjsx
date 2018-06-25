import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Chessboard from '../index';

test('renders notation when notation prop is true', () => {
  const { getByTestId } = render(<Chessboard showNotation={true} />);

  const columnNotationA = getByTestId('column-b');
  const columnNotationH = getByTestId('column-c');
  const bottomLeftColumn = getByTestId('bottom-left-a');
  const bottomLeftRow = getByTestId('bottom-left-1');

  expect(columnNotationA).toBeVisible();
  expect(columnNotationH).toBeVisible();
  expect(bottomLeftColumn).toBeVisible();
  expect(bottomLeftRow).toBeVisible();
});

test('renders notation when notation prop is omitted', () => {
  const { getByTestId } = render(<Chessboard />);

  const columnNotationA = getByTestId('column-b');
  const columnNotationH = getByTestId('column-c');
  const bottomLeftColumn = getByTestId('bottom-left-a');
  const bottomLeftRow = getByTestId('bottom-left-1');

  expect(columnNotationA).toBeVisible();
  expect(columnNotationH).toBeVisible();
  expect(bottomLeftColumn).toBeVisible();
  expect(bottomLeftRow).toBeVisible();
});

it('renders notations when orientation is black', () => {
  const { getByTestId } = render(<Chessboard orientation="black" />);

  const columnNotationA = getByTestId('column-b');
  const columnNotationH = getByTestId('column-c');
  const bottomLeftColumn = getByTestId('bottom-left-h');
  const bottomLeftRow = getByTestId('bottom-left-8');

  expect(columnNotationA).toBeVisible();
  expect(columnNotationH).toBeVisible();
  expect(bottomLeftColumn).toBeVisible();
  expect(bottomLeftRow).toBeVisible();
});
