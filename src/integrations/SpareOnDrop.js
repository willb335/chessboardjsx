import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Chessboard from '../Chessboard';

function SpareOnDrop() {
  const onDrop = ({ sourceSquare, targetSquare, piece }) => {
    console.log('drop', piece, sourceSquare, targetSquare);
  };

  return (
    <div className="App">
      <Chessboard sparePieces position="start" onDrop={onDrop} />
    </div>
  );
}

export default SpareOnDrop;
