import React, { Component } from 'react';

import Chessboard from './Chessboard';
import HumanVsRandom from './integrations/HumanVsRandom';
import RandomVsRandom from './integrations/RandomVsRandom';
import HumanVsHuman from './integrations/HumanVsHuman';
import { roughSquare } from './integrations/customRough';
import RandomFEN from './integrations/RandomFEN';

const calcWidth = screenWidth => (screenWidth < 500 ? 150 : 480);
const boardStyle = {
  borderRadius: '5px',
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
};

class Demo extends Component {
  state = { keep: true };
  render() {
    return (
      <div style={mainContainer}>
        <div style={title}>Chessboard.jsx</div>
        <div style={boardsContainer}>
          <div>
            <div style={board}>
              <div onClick={() => this.setState({ keep: false })}>Hi!!!</div>
              {this.state.keep && (
                <Chessboard
                  id="standard"
                  calcWidth={calcWidth}
                  position="start"
                  animationOnDrop="rubberBand"
                  sparePieces={true}
                  boardStyle={boardStyle}
                />
              )}
            </div>
            <div style={boardDescriptions}>
              Standard board with spare pieces
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
                    roughSquare={roughSquare}
                    animationOnDrop="rubberBand"
                    boardStyle={boardStyle}
                    getPosition={getPosition}
                    darkSquareStyle={darkSquareStyle}
                  />
                )}
              </HumanVsHuman>
            </div>
            <div style={boardDescriptions}>
              With move validation and rough.js
            </div>
          </div>
          <div>
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
          </div>
          <div>
            <div style={board}>
              <RandomVsRandom>
                {({ position }) => (
                  <Chessboard
                    calcWidth={calcWidth}
                    // width={320}
                    id="random"
                    orientation="black"
                    position={position}
                    transitionDuration={300}
                    boardStyle={boardStyle}
                  />
                )}
              </RandomVsRandom>
            </div>
            <div>
              <div style={boardDescriptions}>Random vs Random</div>
            </div>
          </div>
          <div>
            <div style={board}>
              <HumanVsRandom>
                {({ position, onDrop, getPosition, darkSquareStyle }) => (
                  <Chessboard
                    calcWidth={calcWidth}
                    id="humanVsRandom"
                    position={position}
                    transitionDuration={300}
                    onDrop={onDrop}
                    animationOnDrop="pulse"
                    boardStyle={boardStyle}
                    darkSquareStyle={darkSquareStyle}
                    getPosition={getPosition}
                  />
                )}
              </HumanVsRandom>
            </div>
            <div>
              <div style={boardDescriptions}>Human vs Random</div>
            </div>
          </div>
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

const title = {
  fontFamily: 'Neuton, serif',
  fontSize: '5rem',
  margin: 15,
  position: 'relative',
  display: 'flex',
  width: 'auto'
};

const mainContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100vw'
};

const boardDescriptions = {
  fontSize: '2rem',
  textAlign: 'center'
};

const board = { margin: 30 };

// position={
//   '2rq1rk1/pb1n1ppN/4p3/1pb5/3P1Pn1/P1NB4/1PQ3PP/R1B2RK1 w - - 1 16'
// }
// position={
//   '2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50'
// }
