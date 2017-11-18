import React, { Component } from 'react'

import './inputs.css'

class RoomSelectorCreateRoomInput extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div className="input-wrapper">
        <h4 className="input-label">
          Choose your room name
        </h4>
        <input className="input" value={value} onChange={onChange} />
      </div>
    );
  }
}

export default RoomSelectorCreateRoomInput;
