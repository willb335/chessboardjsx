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
import { renderPieces } from './RenderPieces';
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
     * The position to display on the board.  Can be either a FEN string or a position object.
     */
    position: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * If 'black' then row 8 will be the bottom row, if 'white' row 1 will be the bottom row.
     */
    orientation: PropTypes.oneOf(['white', 'black']),
    /**
     * If true, spare pieces will appear above and below the board.
     */
    sparePieces: PropTypes.bool,
    /**
     * The width in pixels.  For a responsive width, use calcWidth.
     */
    width: PropTypes.number,
    defaultPieces: PropTypes.objectOf(PropTypes.object),
    /**
     * The behavior of the piece when dropped off the board. 'snapback' brings the piece
     * back to it's original square and 'trash' deletes the piece from the board
     */
    dropOffBoard: PropTypes.oneOf(['snapback', 'trash']),
    /**
     * The css animation performed on drop.
     */
    animationOnDrop: PropTypes.oneOf(['', 'pulse', 'swing', 'rubberBand']),
    /**
     * The logic to be performed after the drop.  This is where to check if moves are legal with
     * a library like chess.js.
     *
     * Signature: function(sourceSquare: string, targetSquare: string) => void
     */
    onDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    /**
     * If false, the pieces will not be draggable
     */
    draggable: PropTypes.bool,
    /**
     * The time it takes for a piece to slide to the target square.  This is only used
     * when the next position comes from the position prop.  If the next position comes in before
     * the transition is complete, then the animation will appear glitchey.
     */
    transitionDuration: PropTypes.number,
    /**
     * If false, no notation will be shown on the board.
     */
    showNotation: PropTypes.bool,
    /**
     * The style object for the light square.
     */
    lightSquareStyle: PropTypes.object,
    /**
     * The style object for the dark square.
     */
    darkSquareStyle: PropTypes.object,
    /**
     * The style object for the board.
     */
    boardStyle: PropTypes.object,
    /**
     * The id is necessary if more than one board is mounted.
     * This is needed to identify the correct dropzone for the piece.
     */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * A function that gives access to the underlying square element.  This
     * allows for more customizations with rough.js.
     *
     * Signature: function(node, squareWidth: number) => void
     * node: the underlying dom node for the square
     */
    roughSquare: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    /**
     * A collection of squares, useful for legal move highlighting
     */
    selectedSquares: PropTypes.array,
    /**
     * The style object for the selected squares.
     */
    selectedSquareStyle: PropTypes.object,
    /**
     * A function to call when the mouse is over the square.  It takes one argument, the square
     * that the mouse is over (onMouseOverSquare(square)).  Not compatable with touch devices.
     *
     * Signature: function(square: string) => void
     */
    onMouseOverSquare: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    /**
     * A function to call when the mouse has left the square.
     *
     * Signature: function() => void
     */
    onMouseOutSquare: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    /**
     * The style object for the hovered square.
     */
    onHoverSquareStyle: PropTypes.object,
    renderPieces: PropTypes.func,
    /**
     * An object containing custom pieces.  The values can be imported images or
     * svg objects.
     */
    pieces: PropTypes.object,
    /**
     * A function for responsive width control, returns width.
     *
     * Signature: function(screenWidth: number, screenHeight: number) => void
     */
    calcWidth: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    /**
     * A function that returns the current position object.
     *
     * Signature: function(currentPosition: object) => void
     */
    getPosition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  };

  static defaultProps = {
    width: 480,
    calcWidth: false,
    orientation: 'white',
    showNotation: true,
    position: '',
    sparePieces: false,
    draggable: true,
    dropOffBoard: 'snapback',
    defaultPieces,
    animationOnDrop: '',
    onDrop: false,
    transitionDuration: 300,
    boardStyle: {},
    id: '0',
    renderPieces,
    pieces: {},
    lightSquareStyle: { backgroundColor: 'rgb(240, 217, 181)' },
    darkSquareStyle: { backgroundColor: 'rgb(181, 136, 99)' },
    roughSquare: false,
    selectedSquares: [],
    onMouseOverSquare: false,
    onMouseOutSquare: false,
    onHoverSquareStyle: { boxShadow: `inset 0 0 1px 3px yellow` },
    selectedSquareStyle: {
      background: `radial-gradient(circle, #fffc00, #ffffff)`,
      borderRadius: `50%`
    },
    getPosition: false
  };

  static Consumer = ChessboardContext.Consumer;

  state = {
    previousPositionFromProps: null,
    currentPosition: getPositionObject(this.props.position),
    sourceSquare: '',
    targetSquare: '',
    sourcePiece: '',
    waitForTransition: false,
    phantomPiece: null,
    dropSquare: null,
    wasPieceTouched: false,
    manualDrop: false
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
    const {
      position,
      transitionDuration,
      animationOnDrop,
      getPosition
    } = this.props;
    const { waitForTransition, manualDrop } = this.state;
    const positionFromProps = getPositionObject(position);
    const previousPositionFromProps = getPositionObject(prevProps.position);

    // Check if there is a new position coming from props
    if (!isEqual(positionFromProps, previousPositionFromProps)) {
      this.setState({ previousPositionFromProps });
      // get board position for parent component
      getPosition && getPosition(positionFromProps);

      // If piece was dropped manually then give some time for the drop animation
      if (manualDrop) {
        setTimeout(
          () =>
            this.setState({
              manualDrop: false,
              currentPosition: positionFromProps
            }),
          animationOnDrop ? 500 : 0
        );
        return;
      }
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

  // Changes state when there is a new position from props
  static getDerivedStateFromProps(props, state) {
    const { position } = props;
    const { currentPosition, previousPositionFromProps, manualDrop } = state;
    let positionFromProps = getPositionObject(position);

    if (
      previousPositionFromProps &&
      !isEqual(positionFromProps, previousPositionFromProps) &&
      !isEqual(positionFromProps, currentPosition)
    ) {
      // Get position attributes from the difference between currentPosition and positionFromProps
      const {
        sourceSquare,
        targetSquare,
        sourcePiece,
        squaresAffected
      } = constructPositionAttributes(currentPosition, positionFromProps);

      // If the position comes from the onDrop prop then allow for drop animation
      if (manualDrop) {
        return {
          sourceSquare,
          targetSquare,
          sourcePiece,
          currentPosition: positionFromProps,
          waitForTransition: false,
          manualDrop: true
        };
      }

      /* If the new position involves many pieces, then disregard the transition effect.
        Possible to add functionality for transitioning of multiple pieces later */
      if (squaresAffected && squaresAffected !== 2) {
        return {
          currentPosition: positionFromProps,
          waitForTransition: false,
          dropSquare: null,
          manualDrop: false
        };
      }

      /* Check if currentPosition has a piece occupying the target square.
       This is checked in order for there to be smooth transitions on piece captures */
      if (currentPosition[targetSquare]) {
        // Temporarily delete the target square from the new position
        delete positionFromProps[targetSquare];

        return {
          sourceSquare,
          targetSquare,
          sourcePiece,
          // Set the current position to the new position minus the targetSquare
          currentPosition: positionFromProps,
          waitForTransition: true,
          // Create a phantom piece as a stand in
          phantomPiece: { [targetSquare]: currentPosition[targetSquare] },
          dropSquare: null,
          manualDrop: false
        };
      }

      return {
        sourceSquare,
        targetSquare,
        sourcePiece,
        currentPosition: positionFromProps,
        waitForTransition: true,
        dropSquare: null,
        manualDrop: false
      };
    }
    return null;
  }

  // Called on every piece drop
  setAnimation = targetSquare =>
    this.setState({ dropSquare: targetSquare, manualDrop: true });

  /* Called on drop if there is no onDrop prop.  This is what executes when a position does not
   change through the position prop, i.e., simple drag and drop operations on the pieces.*/
  setPosition = (piece, sourceSquare, targetSquare = null) => {
    const { currentPosition } = this.state;
    const { getPosition, dropOffBoard } = this.props;
    if (sourceSquare === targetSquare) return;

    if (dropOffBoard === 'trash' && !targetSquare) {
      let newPosition = currentPosition;
      delete newPosition[sourceSquare];
      this.setState({ currentPosition: newPosition });
      // get board position for parent component
      getPosition && getPosition(currentPosition);

      return;
    }

    let newPosition = currentPosition;
    sourceSquare !== 'spare' && delete newPosition[sourceSquare];
    newPosition[targetSquare] = piece;

    this.setState(() => ({ currentPosition: newPosition }));
    // get board position for parent component
    getPosition && getPosition(currentPosition);
  };

  // Allows for touch drag and drop
  setTouchState = e => this.setState({ wasPieceTouched: e.isTrusted });

  render() {
    const {
      sparePieces,
      width,
      defaultPieces,
      id,
      pieces,
      calcWidth,
      orientation,
      dropOffBoard
    } = this.props;
    const {
      sourceSquare,
      targetSquare,
      sourcePiece,
      waitForTransition,
      phantomPiece,
      dropSquare,
      wasPieceTouched,
      currentPosition,
      manualDrop,
      screenWidth,
      screenHeight
    } = this.state;

    return (
      <ErrorBoundary>
        <ChessboardContext.Provider
          value={{
            ...this.props,
            orientation: orientation.toLowerCase(),
            dropOffBoard: dropOffBoard.toLowerCase(),
            ...{
              width: calcWidth
                ? calcWidth(screenWidth, screenHeight)
                  ? calcWidth(screenWidth, screenHeight)
                  : width
                : width,
              sourceSquare,
              targetSquare,
              sourcePiece,
              waitForTransition,
              phantomPiece,
              setPosition: this.setPosition,
              manualDrop,
              dropSquare,
              setAnimation: this.setAnimation,
              setTouchState: this.setTouchState,
              currentPosition,
              screenWidth,
              screenHeight
            }
          }}
        >
          <div>
            {sparePieces && <SparePieces.Top />}
            <Board {...this.props} />
            {sparePieces && <SparePieces.Bottom />}
          </div>
          <CustomDragLayer
            width={calcWidth ? calcWidth(screenWidth, screenHeight) : width}
            defaultPieces={defaultPieces}
            id={id}
            wasPieceTouched={wasPieceTouched}
            pieces={pieces}
          />
        </ChessboardContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(Chessboard);
