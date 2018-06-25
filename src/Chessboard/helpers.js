import diff from 'deep-diff';

export const ItemTypes = { PIECE: 'piece' };
export const COLUMNS = 'abcdefgh'.split('');

export const constructPositionAttributes = (currentPosition, position) => {
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

function isString(s) {
  return typeof s === 'string';
}

export function fenToObj(fen) {
  if (!validFen(fen)) return false;
  // cut off any move, castling, etc info from the end
  // we're only interested in position information
  fen = fen.replace(/ .+$/, '');

  let rows = fen.split('/');
  let position = {};

  let currentRow = 8;
  for (let i = 0; i < 8; i++) {
    let row = rows[i].split('');
    let colIdx = 0;

    // loop through each character in the FEN section
    for (let j = 0; j < row.length; j++) {
      // number / empty squares
      if (row[j].search(/[1-8]/) !== -1) {
        let numEmptySquares = parseInt(row[j], 10);
        colIdx = colIdx + numEmptySquares;
      } else {
        // piece
        let square = COLUMNS[colIdx] + currentRow;
        position[square] = fenToPieceCode(row[j]);
        colIdx = colIdx + 1;
      }
    }

    currentRow = currentRow - 1;
  }

  return position;
}

function expandFenEmptySquares(fen) {
  return fen
    .replace(/8/g, '11111111')
    .replace(/7/g, '1111111')
    .replace(/6/g, '111111')
    .replace(/5/g, '11111')
    .replace(/4/g, '1111')
    .replace(/3/g, '111')
    .replace(/2/g, '11');
}

export function validFen(fen) {
  if (!isString(fen)) return false;

  // cut off any move, castling, etc info from the end
  // we're only interested in position information
  fen = fen.replace(/ .+$/, '');

  // expand the empty square numbers to just 1s
  fen = expandFenEmptySquares(fen);

  // FEN should be 8 sections separated by slashes
  let chunks = fen.split('/');
  if (chunks.length !== 8) return false;

  // check each section
  for (let i = 0; i < 8; i++) {
    if (chunks[i].length !== 8 || chunks[i].search(/[^kqrnbpKQRNBP1]/) !== -1) {
      return false;
    }
  }

  return true;
}

// convert FEN piece code to bP, wK, etc
function fenToPieceCode(piece) {
  // black piece
  if (piece.toLowerCase() === piece) {
    return 'b' + piece.toUpperCase();
  }

  // white piece
  return 'w' + piece.toUpperCase();
}

function validSquare(square) {
  return isString(square) && square.search(/^[a-h][1-8]$/) !== -1;
}

function validPieceCode(code) {
  return isString(code) && code.search(/^[bw][KQRNBP]$/) !== -1;
}

export function validPositionObject(pos) {
  if (pos === null || typeof pos !== 'object') return false;

  for (let i in pos) {
    if (!pos.hasOwnProperty(i)) continue;

    if (!validSquare(i) || !validPieceCode(pos[i])) {
      return false;
    }
  }
  return true;
}

function squeezeFenEmptySquares(fen) {
  return fen
    .replace(/11111111/g, '8')
    .replace(/1111111/g, '7')
    .replace(/111111/g, '6')
    .replace(/11111/g, '5')
    .replace(/1111/g, '4')
    .replace(/111/g, '3')
    .replace(/11/g, '2');
}

// convert bP, wK, etc code to FEN structure
function pieceCodeToFen(piece) {
  let pieceCodeLetters = piece.split('');

  // white piece
  if (pieceCodeLetters[0] === 'w') {
    return pieceCodeLetters[1].toUpperCase();
  }

  // black piece
  return pieceCodeLetters[1].toLowerCase();
}

// position object to FEN string
// returns false if the obj is not a valid position object
export function objToFen(obj) {
  if (!validPositionObject(obj)) return false;

  let fen = '';

  let currentRow = 8;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let square = COLUMNS[j] + currentRow;

      // piece exists
      if (obj.hasOwnProperty(square)) {
        fen = fen + pieceCodeToFen(obj[square]);
      } else {
        // empty space
        fen = fen + '1';
      }
    }

    if (i !== 7) {
      fen = fen + '/';
    }

    currentRow = currentRow - 1;
  }

  // squeeze the empty numbers together
  fen = squeezeFenEmptySquares(fen);

  return fen;
}
