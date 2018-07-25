import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chessboard from '../Chessboard';

/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */

class AllowDrag extends Component {
  static propTypes = { children: PropTypes.func };

  allowDrag = ({ piece }) => {
    if (piece === 'wB' || piece === 'spare-wB') {
      return false;
    }
    return true;
  };
  render() {
    return this.props.children({ allowDrag: this.allowDrag });
  }
}

export default function AllowDragFeature() {
  return (
    <div>
      <AllowDrag>
        {({ allowDrag }) => (
          <Chessboard
            id="allowDrag"
            orientation="black"
            calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
            position="start"
            boardStyle={{
              borderRadius: '5px',
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            dropOffBoard="trash"
            sparePieces={true}
            allowDrag={allowDrag}
            draggable={true}
          />
        )}
      </AllowDrag>
    </div>
  );
}
