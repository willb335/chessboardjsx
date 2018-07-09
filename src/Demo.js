import React, { Component } from 'react';

import Chessboard from './Chessboard';
// import HumanVsRandom from './integrations/HumanVsRandom';
// import RandomVsRandom from './integrations/RandomVsRandom';
// import HumanVsHuman from './integrations/HumanVsHuman';
// import { roughSquare } from './integrations/customRough';
// import RandomFEN from './integrations/RandomFEN';
import bK from './img/kingJames.png';

// const calcWidth = screenWidth => (screenWidth < 500 ? 150 : 480);
const boardStyle = {
  borderRadius: '5px',
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
};

class Demo extends Component {
  state = { keep: true };
  render() {
    return (
      <div style={boardsContainer}>
        <div>
          <div style={board}>
            <Chessboard
              id="standard"
              // calcWidth={calcWidth}
              width={500}
              position="start"
              // position={{
              //   d6: 'bK',
              //   d4: 'wP',
              //   e4: 'wK'
              // }}
              // animationOnDrop="rubberBand"
              // sparePieces={true}
              boardStyle={boardStyle}
              pieces={{ bK }}
              // orientation="black"
            />
          </div>
        </div>
        <div>
          {/* <div style={board}>
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
                  // width={500}
                  calcWidth={calcWidth}
                  position={position}
                  selectedSquares={selectedSquares}
                  onDrop={onDrop}
                  onMouseOverSquare={onMouseOverSquare}
                  onMouseOutSquare={onMouseOutSquare}
                  // roughSquare={roughSquare}
                  boardStyle={boardStyle}
                  showNotation={true}
                  orientation="black"
                  // getPosition={getPosition}
                  // darkSquareStyle={darkSquareStyle}
                />
              )}
            </HumanVsHuman>
          </div> */}
          {/* <div style={boardDescriptions}>
              With move validation and rough.js
            </div>
          </div> */}
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
                    // calcWidth={calcWidth}
                    width={500}
                    id="random"
                    // orientation="black"
                    position={position}
                    transitionDuration={300}
                    boardStyle={boardStyle}
                    pieces={{ bP: bK }}
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
          {/* <div>
            <div style={board}>
              <Engine>
                {({ position, onDrop }) => (
                  <Chessboard
                    id="stockfish"
                    position={position}
                    width={350}
                    onDrop={onDrop}
                    // imageFormat="png"
                  />
                )}
              </Engine>
            </div>
            <div style={boardDescriptions}>Play Stockfish</div>
          </div>*/}
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
