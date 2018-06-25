import isEqual from 'lodash.isequal';
import diff from 'deep-diff';

import { fenToObj, validPositionObject, validFen } from '../helpers';

test('converts FEN string to position object', () => {
  const fen = '8/8/4k3/4P3/4K3/8/8/8 w - -';
  expect(fenToObj(fen)).toEqual({ e4: 'wK', e6: 'bK', e5: 'wP' });
});

test('checks if is valid FEN', () => {
  const fen = '8/8/4k3/4P3/4K3/8/8/8 w - -';
  const invalidFen = '8/8/7/4k3/4P3/4K3/8/8/8 w - -';
  const invalidFen2 = '-5/8/4k3/4P3/4K3/8/8/8 w - -';

  expect(validFen(fen)).toBe(true);
  expect(validFen(invalidFen)).toBe(false);
  expect(validFen(invalidFen2)).toBe(false);
});

test('checks if is valid position object', () => {
  expect(validPositionObject({ e4: 'wK', e6: 'bK', e5: 'wP' })).toBe(true);
  expect(validPositionObject({ e4: 'wK', e6: 'bK', e5: 'wP', f9: 'wP' })).toBe(
    false
  );
  expect(validPositionObject({ e4: 'wK', e6: 'bK', e5: 'wP', e1: 'bM' })).toBe(
    false
  );
});

test('check lodash isEqual', () => {
  const pos1 = { e4: 'wK', e6: 'bK', e5: 'wP' };
  const pos2 = { e4: 'wK', e6: 'bK', e5: 'wP' };
  const pos3 = { e4: 'wK', e6: 'bK', e5: 'wB' };

  expect(isEqual(pos1, pos2)).toBe(true);
  expect(isEqual(pos1, pos3)).toBe(false);
});

test('deep diff', () => {
  const constructPositionAttributes = (currentPosition, position) => {
    const difference = diff(currentPosition, position);
    const squaresAffected = difference.length;
    const sourceSquare =
      difference && difference[1] && difference && difference[1].kind === 'D'
        ? difference[1].path && difference[1].path[0]
        : difference[0].path && difference[0].path[0];
    const targetSquare =
      difference && difference[1] && difference && difference[1].kind === 'D'
        ? difference[0] && difference[0].path[0]
        : difference[1] && difference[1].path[0];
    const sourcePiece =
      difference && difference[1] && difference && difference[1].kind === 'D'
        ? difference[1] && difference[1].lhs
        : difference[1] && difference[1].rhs;
    return { sourceSquare, targetSquare, sourcePiece, squaresAffected };
  };

  const pos1 = { e4: 'wK', e6: 'bK', e5: 'wP' };
  const pos2 = { e4: 'wK', e7: 'bK', e5: 'wP' };

  expect(constructPositionAttributes(pos1, pos2).sourceSquare).toBe('e6');
  expect(constructPositionAttributes(pos1, pos2).targetSquare).toBe('e7');
  expect(constructPositionAttributes(pos1, pos2).sourcePiece).toBe('bK');
  expect(constructPositionAttributes(pos1, pos2).squaresAffected).toBe(2);
});
