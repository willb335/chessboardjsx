export default props => {
  if (typeof props.width !== 'number') {
    throw new TypeError('The width prop must be a number');
  }
  if (
    typeof props.calcWidth !== 'function' &&
    typeof props.calcWidth !== 'boolean'
  ) {
    throw new TypeError(
      'The calcWidth prop must be function "calcWidth(screenWidth, screenHeight)""'
    );
  }

  if (props.orientation !== 'white' && props.orientation !== 'black') {
    throw new TypeError(
      'The orientation prop should be either "black" or "white"'
    );
  }

  if (props.dropOffBoard !== 'snapback' && props.dropOffBoard !== 'trash') {
    throw new TypeError(
      'The dropOffBoard prop should be either "snapback"(default) or "trash"'
    );
  }

  if (
    props.animationOnDrop !== 'pulse' &&
    props.animationOnDrop !== 'rubberBand' &&
    props.animationOnDrop !== 'swing' &&
    props.animationOnDrop !== ''
  ) {
    throw new TypeError(
      'The animationOnDrop prop should be either ""(default), "pulse", "rubberBand" or "swing"'
    );
  }

  if (props.pieces !== {} && typeof props.pieces !== 'object') {
    throw new TypeError('The pieces props must be an object');
  }

  if (props.width % 8 !== 0 && props.animationOnDrop) {
    console.log(
      'When using drop animations it is recommended to make the width divisible by 8 to ensure Safari can handle the animation smoothly'
    );
  }
};
