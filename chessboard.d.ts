import { Component, CSSProperties } from 'react';

type Square =
  'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' |
  'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' |
  'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' |
  'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' |
  'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' |
  'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' |
  'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' |
  'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1'
;

type Piece =
  'wP' | 'wN' | 'wB' | 'wR' | 'wQ' | 'wK' |
  'bP' | 'bN' | 'bB' | 'bR' | 'bQ' | 'bK'
;

type Position = {
  [pos in Square]?: Piece
}

type CustomPieces = {
  [piece in Piece]?: (obj: {isDragging: boolean, squareWidth: number, droppedPiece: string, targetSquare: string, sourceSquare: string}) => JSX.Element
}

interface Props {
  allowDrag?: (obj: {piece: string, sourceSquare: string}) => boolean,
  boardStyle?: CSSProperties,
  calcWidth?: (obj: {screenWidth: number, screenHeight: number}) => number,
  darkSquareStyle?: CSSProperties,
  draggable?: boolean,
  dropOffBoard?: 'snapback' | 'trash',
  dropSquareStyle?: CSSProperties,
  getPosition?: (currentPosition: Position) => void,
  id?: string | number,
  lightSquareStyle?: CSSProperties,
  onDragOverSquare?: (square: string) => void,
  onDrop?: (obj: {sourceSquare: string, targetSquare: string, piece: string}) => void,
  onMouseOutSquare?: (square: string) => void,
  onMouseOverSquare?: (square: string) => void,
  onPieceClick?: (piece: string) => void,
  onSquareClick?: (square: string) => void,
  onSquareRightClick?: (square: string) => void,
  orientation?: 'white' | 'black',
  pieces?: CustomPieces,
  position?: string | Position,
  roughSquare?: (obj: {squareElement: SVGElement, squareWidth: number}) => void,
  showNotation?: boolean,
  sparePieces?: boolean,
  squareStyles?: {[square in Square]?: CSSProperties},
  transitionDuration?: number,
  width?: number,
  undo?: boolean,
}

export default class Chessboard extends Component<Props> {
}
