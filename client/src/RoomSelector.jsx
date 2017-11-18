import React, { Component } from 'react';

import Room from './Room'
import RoomSelectorCreateRoom from './RoomSelectorCreateRoom'
import './RoomSelector.css'

class RoomSelector extends Component {
  render() {
    const { rooms } = this.props;
    return (
      <div className="room-selector">
        <h2>Join a room</h2>
        { rooms.map(room => <Room key={room.name} room={room} setRoom={this.props.setRoom} />) }
        <RoomSelectorCreateRoom onCreateRoom={this.props.onCreateRoom} />
      </div>
    );
  }
}

export default RoomSelector;
