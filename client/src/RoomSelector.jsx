import React, { Component } from 'react';

import Room from './Room'
import RoomSelectorCreateRoom from './RoomSelectorCreateRoom'
import './RoomSelector.css'

import { getRooms } from './services'

class RoomSelector extends Component {
  state = {
    rooms: []
  }
  componentDidMount() {
    getRooms().then(result => {
      this.setState({ rooms: result.rooms })
    })
  }
  render() {
    const { rooms } = this.state;
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
