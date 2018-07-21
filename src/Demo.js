import React, { Component } from 'react';

import WithMoveValidation from './integrations/WithMoveValidation';
import PlayRandomMoveEngine from './integrations/PlayRandomMoveEngine';
import RandomVsRandomGame from './integrations/RandomVsRandomGame';
import CustomizedBoard from './integrations/CustomizedBoard';

class Demo extends Component {
  state = {
    showCustomizedBoard: false,
    showWithMoveValidation: false,
    showRandomVsRandomGame: false,
    showPlayRandomMoveEngine: false
  };
  render() {
    return (
      <div>
        <div style={buttonRow}>
          <button
            onClick={() =>
              this.setState({
                showCustomizedBoard: true,
                showWithMoveValidation: false,
                showRandomVsRandomGame: false,
                showPlayRandomMoveEngine: false
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'orange' } }}
          >
            Click for Custom Board
          </button>
          <button
            onClick={() =>
              this.setState({
                showCustomizedBoard: false,
                showWithMoveValidation: true,
                showRandomVsRandomGame: false,
                showPlayRandomMoveEngine: false
              })
            }
            style={{
              ...buttonStyle,
              ...{ backgroundColor: 'purple', color: 'white' }
            }}
          >
            Click for Board With Move Validation
          </button>
          <button
            onClick={() =>
              this.setState({
                showCustomizedBoard: false,
                showWithMoveValidation: false,
                showRandomVsRandomGame: true,
                showPlayRandomMoveEngine: false
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'gold' } }}
          >
            Click for Board Playing a Random Game
          </button>
          <button
            onClick={() =>
              this.setState({
                showCustomizedBoard: false,
                showWithMoveValidation: false,
                showRandomVsRandomGame: false,
                showPlayRandomMoveEngine: true
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'silver' } }}
          >
            Click to Play a Random Move Engine
          </button>
        </div>
        <div style={boardsContainer}>
          {this.state.showCustomizedBoard && <CustomizedBoard />}
          {this.state.showWithMoveValidation && <WithMoveValidation />}
          {this.state.showRandomVsRandomGame && <RandomVsRandomGame />}
          {this.state.showPlayRandomMoveEngine && <PlayRandomMoveEngine />}
        </div>
      </div>
    );
  }
}

export default Demo;

const buttonStyle = { width: 200, height: 100, margin: 30, fontSize: 16 };

const buttonRow = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '80vw',
  flexWrap: 'wrap'
};

const boardsContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '80vw',
  marginTop: 30,
  marginBottom: 50
};
