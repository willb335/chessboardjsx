import React, { Component } from 'react';
import Board from './Board';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { DragDropContext } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';

import SparePieces from './SparePieces';
import {
  fenToObj,
  validFen,
  validPositionObject,
  constructPositionAttributes
} from './helpers';
import CustomDragLayer from './CustomDragLayer';
import defaultPieces from './svg/chesspieces/standard';
import ErrorBoundary from './ErrorBoundary';

const ChessboardContext = React.createContext();

const getPositionObject = position => {
  if (position === 'start')
    return fenToObj('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  if (validFen(position)) return fenToObj(position);
  if (validPositionObject(position)) return position;

  return {};
};

class Chessboard extends Component {
  static propTypes = {
    /**
     * The id prop is necessary if more than one board is mounted.
     * Drag and drop will not work as expected if not provided.
     */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The position to display on the board.  Can be either a FEN string or a position object.
     * See https://www.chessboardjsx.com/basics/fen and https://www.chessboardjsx.com/basics/position-object
     * for examples.
     */
    position: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * An object with functions returning jsx as values(render prop).
     * See https://www.chessboardjsx.com/custom
     * Signature: { wK:
     * function({ isDragging, squareWidth, droppedPiece, targetSquare, sourceSquare }) => jsx }
     */
    pieces: PropTypes.object,
    /**
     * The width in pixels.  For a responsive width, use calcWidth.
     */
    width: PropTypes.number,
    /**
     * Orientation of the board.
     */
    orientation: PropTypes.oneOf(['white', 'black']),
    /**
     * If false, notation will not be shown on the board.
     */
    showNotation: PropTypes.bool,
    /**
     * If true, spare pieces will appear above and below the board.
     */
    sparePieces: PropTypes.bool,
    /**
     * If false, the pieces will not be draggable
     */
    draggable: PropTypes.bool,
    /**
     * The behavior of the piece when dropped off the board. 'snapback' brings the piece
     * back to it's original square and 'trash' deletes the piece from the board
     */
    dropOffBoard: PropTypes.oneOf(['snapback', 'trash']),
    /**
     * The time it takes for a piece to slide to the target square.  Only used
     * when the next position comes from the position prop. See chessboardjsx.com/integrations/random for an example
     */
    transitionDuration: PropTypes.number,
    /**
     * The style object for the board.
     */
    boardStyle: PropTypes.object,
    /**
     * The style object for the light square.
     */
    lightSquareStyle: PropTypes.object,
    /**
     * The style object for the dark square.
     */
    darkSquareStyle: PropTypes.object,
    /**
     * An object containing custom styles for squares.  For example {'e4': {backgroundColor: 'orange'},
     * 'd4': {backgroundColor: 'blue'}}.  See chessboardjsx.com/integrations/move-validation for an example
     */
    squareStyles: PropTypes.object,
    /**
     * The style object for the current drop square. { backgroundColor: 'sienna' }
     */
    dropSquareStyle: PropTypes.object,
    /**
     * A function for responsive size control, returns the width of the board.
     *
     * Signature: function({ screenWidth: number, screenHeight: number }) => number
     */
    calcWidth: PropTypes.func,
    /**
     * A function that gives access to the underlying square element.  It
     * allows for customizations with rough.js. See chessboardjsx.com/custom for an
     * example.
     *
     * Signature: function({ squareElement: node, squareWidth: number }) => void
     */
    roughSquare: PropTypes.func,
    /**
     *  A function to call when the mouse is over a square.
     *  See chessboardjsx.com/integrations/move-validation for an example.
     *
     *  Signature: function(square: string) => void
     */
    onMouseOverSquare: PropTypes.func,
    /**
     * A function to call when the mouse has left the square.
     * See chessboardjsx.com/integrations/move-validation for an example.
     *
     * Signature: function(square: string) => void
     */
    onMouseOutSquare: PropTypes.func,
    /**
     * The logic to be performed on piece drop. See chessboardjsx.com/integrations for examples.
     *
     * Signature: function({ sourceSquare: string, targetSquare: string, piece: string }) => void
     */
    onDrop: PropTypes.func,
    /**
     * A function that gives access to the current position object.
     * For example, getPosition = position => this.setState({ myPosition: position }).
     *
     * Signature: function(currentPosition: object) => void
     */
    getPosition: PropTypes.func,
    /**
     * A function to call when a piece is dragged over a specific square.
     *
     * Signature: function(square: string) => void
     */
    onDragOverSquare: PropTypes.func,
    /**
     * A function to call when a square is clicked.
     *
     * Signature: function(square: string) => void
     */
    onSquareClick: PropTypes.func,
    /**
     * A function to call when a piece is clicked.
     *
     * Signature: function(piece: string) => void
     */
    onPieceClick: PropTypes.func,
    /**
     * A function to call when a square is right clicked.
     *
     * Signature: function(square: string) => void
     */
    onSquareRightClick: PropTypes.func,
    /**
     * A function to call when a piece drag is initiated.  Returns true if the piece is draggable,
     * false if not.
     *
     * Signature: function( { piece: string, sourceSquare: string } ) => bool
     */
    allowDrag: PropTypes.func,
    /**
    When set to true it undos previous move
     */
    undo: PropTypes.bool
  };

  static defaultProps = {
    id: '0',
    position: '',
    pieces: {},
    width: 560,
    orientation: 'white',
    showNotation: true,
    sparePieces: false,
    draggable: true,
    undo: false,
    dropOffBoard: 'snapback',
    transitionDuration: 300,
    boardStyle: {},
    lightSquareStyle: { backgroundColor: 'rgb(240, 217, 181)' },
    darkSquareStyle: { backgroundColor: 'rgb(181, 136, 99)' },
    squareStyles: {},
    dropSquareStyle: { boxShadow: 'inset 0 0 1px 4px yellow' },
    calcWidth: () => {},
    roughSquare: () => {},
    onMouseOverSquare: () => {},
    onMouseOutSquare: () => {},
    onDrop: () => {},
    getPosition: () => {},
    onDragOverSquare: () => {},
    onSquareClick: () => {},
    onPieceClick: () => {},
    onSquareRightClick: () => {},
    allowDrag: () => true
  };

  static Consumer = ChessboardContext.Consumer;

  state = {
    previousPositionFromProps: getPositionObject(this.props.position),
    currentPosition: getPositionObject(this.props.position),
    sourceSquare: '',
    targetSquare: '',
    sourcePiece: '',
    waitForTransition: false,
    phantomPiece: null,
    wasPieceTouched: false,
    manualDrop: false,
    squareClicked: false,
    firstMove: false,
    pieces: { ...defaultPieces, ...this.props.pieces },
    undoMove: this.props.undo
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  };

  componentDidUpdate(prevProps) {
    const { position, transitionDuration, getPosition } = this.props;
    const { waitForTransition, undoMove } = this.state;
    const positionFromProps = getPositionObject(position);
    const previousPositionFromProps = getPositionObject(prevProps.position);

    // Check if there is a new position coming from props or undo is called
    if (!isEqual(positionFromProps, previousPositionFromProps) || undoMove) {
      this.setState({
        previousPositionFromProps: previousPositionFromProps,
        undoMove: false
      });

      // get board position for user
      getPosition(positionFromProps);

      // Give piece time to transition.
      if (waitForTransition) {
        return new Promise(resolve => {
          this.setState({ currentPosition: positionFromProps }, () =>
            setTimeout(() => {
              this.setState({ waitForTransition: false });
              resolve();
            }, transitionDuration)
          );
        }).then(() =>
          setTimeout(
            () => this.setState({ phantomPiece: null }),
            transitionDuration
          )
        );
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { position, undo } = props;
    const {
      currentPosition,
      manualDrop,
      squareClicked
    } = state;
    let positionFromProps = getPositionObject(position);

    // If positionFromProps is a new position then execute, else return null
    if (!isEqual(positionFromProps, currentPosition)) {
      // Position attributes from the diff between currentPosition and positionFromProps
      const {
        sourceSquare,
        targetSquare,
        sourcePiece,
        squaresAffected
      } = constructPositionAttributes(currentPosition, positionFromProps);

      if (manualDrop) {
        return {
          sourceSquare,
          targetSquare,
          sourcePiece,
          currentPosition: positionFromProps,
          waitForTransition: false,
          manualDrop: false
        };
      }

      /* If the new position involves many pieces, then disregard the transition effect.
        Possible to add functionality for transitioning of multiple pieces later */
      if (squaresAffected && squaresAffected !== 2) {
        return {
          currentPosition: positionFromProps,
          waitForTransition: false,
          manualDrop: false,
          sourceSquare,
          targetSquare,
          sourcePiece
        };
      }

      // Check if currentPosition has a piece occupying the target square
      if (currentPosition[targetSquare]) {
        // Temporarily delete the target square from the new position
        delete positionFromProps[targetSquare];

        return {
          sourceSquare,
          targetSquare,
          sourcePiece,
          // Set the current position to the new position minus the targetSquare
          currentPosition: positionFromProps,
          waitForTransition: squareClicked ? false : true,
          phantomPiece: squareClicked
            ? null
            : { [targetSquare]: currentPosition[targetSquare] },
          manualDrop: false,
          squareClicked: false
        };
      }

      // allows for taking back a move
      if (undo) {
        return {
          sourceSquare,
          targetSquare,
          sourcePiece,
          currentPosition: positionFromProps,
          waitForTransition: true,
          manualDrop: false,
          squareClicked: false,
          undoMove: true
        };
      }

      return {
        sourceSquare,
        targetSquare,
        sourcePiece,
        currentPosition: positionFromProps,
        waitForTransition: squareClicked ? false : true,
        manualDrop: false,
        squareClicked: false
      };
    }

    // default case
    return null;
  }

  wasManuallyDropped = bool => this.setState({ manualDrop: bool });
  wasSquareClicked = bool => this.setState({ squareClicked: bool });

  /* Called on drop if there is no onDrop prop.  This is what executes when a position does not
   change through the position prop, i.e., simple drag and drop operations on the pieces.*/
  setPosition = ({ sourceSquare, targetSquare, piece }) => {
    const { currentPosition } = this.state;
    const { getPosition, dropOffBoard } = this.props;

    if (sourceSquare === targetSquare) return;

    if (dropOffBoard === 'trash' && !targetSquare) {
      let newPosition = currentPosition;
      delete newPosition[sourceSquare];
      this.setState({ currentPosition: newPosition, manualDrop: true });
      // get board position for user
      return getPosition(currentPosition);
    }

    let newPosition = currentPosition;
    sourceSquare !== 'spare' && delete newPosition[sourceSquare];
    newPosition[targetSquare] = piece;

    this.setState({ currentPosition: newPosition, manualDrop: true });
    // get board position for user
    getPosition(currentPosition);
  };

  // Allows for touch drag and drop
  setTouchState = e => this.setState({ wasPieceTouched: e.isTrusted });

  getWidth = () => {
    const { calcWidth, width } = this.props;
    const { screenWidth, screenHeight } = this.state;
    return calcWidth({ screenWidth, screenHeight })
      ? calcWidth({ screenWidth, screenHeight })
      : width;
  };

  render() {
    const { sparePieces, id, orientation, dropOffBoard } = this.props;
    const {
      sourceSquare,
      targetSquare,
      sourcePiece,
      waitForTransition,
      phantomPiece,
      wasPieceTouched,
      currentPosition,
      manualDrop,
      screenWidth,
      screenHeight,
      pieces
    } = this.state;

    const getScreenDimensions = screenWidth && screenHeight;

    return (
      <ErrorBoundary>
        <ChessboardContext.Provider
          value={{
            ...this.props,
            pieces,
            orientation: orientation.toLowerCase(),
            dropOffBoard: dropOffBoard.toLowerCase(),
            ...{
              width: this.getWidth(),
              sourceSquare,
              targetSquare,
              sourcePiece,
              waitForTransition,
              phantomPiece,
              setPosition: this.setPosition,
              manualDrop,
              setTouchState: this.setTouchState,
              currentPosition,
              screenWidth,
              screenHeight,
              wasManuallyDropped: this.wasManuallyDropped,
              wasSquareClicked: this.wasSquareClicked
            }
          }}
        >
          <div>
            {getScreenDimensions && sparePieces && <SparePieces.Top />}
            {getScreenDimensions && <Board />}
            {getScreenDimensions && sparePieces && <SparePieces.Bottom />}
          </div>
          <CustomDragLayer
            width={this.getWidth()}
            pieces={pieces}
            id={id}
            wasPieceTouched={wasPieceTouched}
            sourceSquare={targetSquare}
          />
        </ChessboardContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(Chessboard);
