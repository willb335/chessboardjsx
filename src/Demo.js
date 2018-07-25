import React, { Component } from 'react';

import WithMoveValidation from './integrations/WithMoveValidation';
import PlayRandomMoveEngine from './integrations/PlayRandomMoveEngine';
import RandomVsRandomGame from './integrations/RandomVsRandomGame';
import CustomizedBoard from './integrations/CustomizedBoard';
import AllowDragFeature from './integrations/AllowDrag';

class Demo extends Component {
  state = {
    showCustomizedBoard: false,
    showWithMoveValidation: false,
    showRandomVsRandomGame: false,
    showPlayRandomMoveEngine: false,
    showAllowDragFeature: false
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
                showPlayRandomMoveEngine: false,
                showAllowDragFeature: false
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'orange' } }}
          >
            Custom Board
          </button>
          <button
            onClick={() =>
              this.setState({
                showCustomizedBoard: false,
                showWithMoveValidation: true,
                showRandomVsRandomGame: false,
                showPlayRandomMoveEngine: false,
                showAllowDragFeature: false
              })
            }
            style={{
              ...buttonStyle,
              ...{ backgroundColor: 'purple', color: 'white' }
            }}
          >
            With Move Validation
          </button>
          <button
            onClick={() =>
              this.setState({
                showCustomizedBoard: false,
                showWithMoveValidation: false,
                showRandomVsRandomGame: true,
                showPlayRandomMoveEngine: false,
                showAllowDragFeature: false
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'gold' } }}
          >
            Random Vs Random
          </button>
          <button
            onClick={() =>
              this.setState({
                showCustomizedBoard: false,
                showWithMoveValidation: false,
                showRandomVsRandomGame: false,
                showPlayRandomMoveEngine: true,
                showAllowDragFeature: false
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'silver' } }}
          >
            Play a Random Move Engine
          </button>
          <button
            onClick={() =>
              this.setState({
                showCustomizedBoard: false,
                showWithMoveValidation: false,
                showRandomVsRandomGame: false,
                showPlayRandomMoveEngine: false,
                showAllowDragFeature: true
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'aqua' } }}
          >
            Conditionally Disable Drag
          </button>
        </div>
        <div style={boardsContainer}>
          {this.state.showCustomizedBoard && <CustomizedBoard />}
          {this.state.showWithMoveValidation && <WithMoveValidation />}
          {this.state.showRandomVsRandomGame && <RandomVsRandomGame />}
          {this.state.showPlayRandomMoveEngine && <PlayRandomMoveEngine />}
          {this.state.showAllowDragFeature && <AllowDragFeature />}
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
  width: '100vw',
  flexWrap: 'wrap'
};

const boardsContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100vw',
  marginTop: 30,
  marginBottom: 50
};
