import React, { Component } from 'react';

import Chessboard from './Chessboard';
// import HumanVsRandom from './integrations/HumanVsRandom';
// import RandomVsRandom from './integrations/RandomVsRandom';
import HumanVsHuman from './integrations/HumanVsHuman';
// import RandomFEN from './integrations/RandomFEN';
// import Stockfish from './integrations/Stockfish';
// import { roughSquare } from './integrations/customRough';
import bK from './img/kingJames.png';

class Demo extends Component {
  render() {
    return (
      <div style={boardsContainer}>
        <div>
          <div style={board}>
            <Chessboard
              id="standard"
              calcWidth={calcWidth}
              position="start"
              boardStyle={boardStyle}
              pieces={{ bK }}
              sparePieces={true}
            />
          </div>
        </div>
        <div>
          <div style={board}>
            <HumanVsHuman>
              {({
                position,
                selectedSquares,
                onDrop,
                onMouseOverSquare,
                onMouseOutSquare,
                getPosition,
                darkSquareStyle
              }) => (
                <Chessboard
                  id="humanVsHuman"
                  calcWidth={calcWidth}
                  position={position}
                  selectedSquares={selectedSquares}
                  onDrop={onDrop}
                  onMouseOverSquare={onMouseOverSquare}
                  onMouseOutSquare={onMouseOutSquare}
                  boardStyle={boardStyle}
                  orientation="black"
                  getPosition={getPosition}
                  darkSquareStyle={darkSquareStyle}
                  lightSquareStyle={{ backgroundColor: 'white' }}
                />
              )}
            </HumanVsHuman>
          </div>
          {/* <div>
            <div style={board}>
              <RandomFEN>
                {({ position }) => (
                  <Chessboard
                    id="randomFEN"
                    calcWidth={calcWidth}
                    orientation="black"
                    position={position}
                    boardStyle={boardStyle}
                  />
                )}
              </RandomFEN>
            </div>
            <div style={boardDescriptions}>
              Random positions set via position prop
            </div>
          </div> */}
          {/* <div>
            <div style={board}>
              <RandomVsRandom>
                {({ position }) => (
                  <Chessboard
                    width={500}
                    id="random"
                    position={position}
                    transitionDuration={300}
                    boardStyle={boardStyle}
                  />
                )}
              </RandomVsRandom>
            </div>
          </div> */}
          {/* <div>
            <div style={board}>
              <HumanVsRandom>
                {({ position, onDrop, getPosition, darkSquareStyle }) => (
                  <Chessboard
                    calcWidth={calcWidth}
                    id="humanVsRandom"
                    position={position}
                    onDrop={onDrop}
                    boardStyle={boardStyle}
                    darkSquareStyle={darkSquareStyle}
                    getPosition={getPosition}
                  />
                )}
              </HumanVsRandom>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Demo;

const boardsContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '90vw',
  fontFamily: 'Neuton, serif'
};

const board = { margin: 30 };

const calcWidth = screenWidth => (screenWidth < 500 ? 150 : 480);
const boardStyle = {
  borderRadius: '5px',
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
};
