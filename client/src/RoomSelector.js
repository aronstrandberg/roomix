import React, { Component } from 'react';

import Room from './Room'
import './RoomSelector.css'

class RoomSelector extends Component {
  setRoom = (id) => {
    this.props.setRoom(id);
  }
  render() {
    const { rooms } = this.props;
    return (
      <div className="room-selector">
        <h2>Join a room</h2>
        { rooms.map(room => <Room key={room.id} room={room} setRoom={this.setRoom} />) }
      </div>
    );
  }
}

export default RoomSelector;
