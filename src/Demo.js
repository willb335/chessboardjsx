import React, { Component } from 'react';

import Chessboard from './Chessboard';
// import HumanVsRandom from './integrations/HumanVsRandom';
// import RandomVsRandom from './integrations/RandomVsRandom';
import HumanVsHuman from './integrations/HumanVsHuman';
// import RandomFEN from './integrations/RandomFEN';
// import Stockfish from './integrations/Stockfish';
// import { roughSquare } from './integrations/customRough';
// import lebronJames from './img/kingJames.png';
// import elvis from './img/elvis.png';
// import defaultPieces from './Chessboard/svg/chesspieces/standard';

class Demo extends Component {
  render() {
    return (
      <div style={boardsContainer}>
        {/* <div>
          <div style={board}>
            <Chessboard
              id="standard"
              calcWidth={calcWidth}
              position="start"
              boardStyle={boardStyle}
              dropOffBoard="trash"
              pieces={{
                bK: ({
                  squareWidth,
                  piece,
                  // isDragging,
                  targetSquare
                  // sourceSquare
                }) =>
                  // console.log(
                  //   'piece',
                  //   piece,
                  //   'targetSquare',
                  //   targetSquare,
                  //   'sourceSquare',
                  //   sourceSquare
                  // ) ||
                  targetSquare === 'e4' && piece === 'wN' ? (
                    <img
                      style={{
                        width: squareWidth,
                        height: squareWidth
                      }}
                      src={elvis}
                      alt={'elvis'}
                    />
                  ) : (
                    <img
                      style={{
                        width: squareWidth,
                        height: squareWidth
                      }}
                      src={lebronJames}
                      alt={'lebron'}
                    />
                  )
              }}
              sparePieces={true}
            />
          </div>
        </div> */}
        <div>
          <div style={board}>
            <HumanVsHuman>
              {({
                position,
                onDrop,
                onMouseOverSquare,
                onMouseOutSquare,
                squareStyles
              }) => (
                <Chessboard
                  id="humanVsHuman"
                  calcWidth={calcWidth}
                  position={position}
                  onDrop={onDrop}
                  onMouseOverSquare={onMouseOverSquare}
                  onMouseOutSquare={onMouseOutSquare}
                  boardStyle={boardStyle}
                  sparePieces={true}
                  squareStyles={squareStyles}
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
                    pieces={{
                      bP: ({ squareWidth }) => (
                        <div>
                          <img
                            style={{ width: squareWidth, height: squareWidth }}
                            src={lebronJames}
                            alt={'lebron'}
                          />
                        </div>
                      )
                    }}
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

const calcWidth = screenWidth => (screenWidth < 500 ? 350 : 480);
const boardStyle = {
  borderRadius: '5px',
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
};
