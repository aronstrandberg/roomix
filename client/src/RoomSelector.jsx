import React, { Component } from 'react';

import Room from './Room'
import RoomSelectorCreateRoom from './RoomSelectorCreateRoom'
import './RoomSelector.css'

import { getRooms } from './services'

class RoomSelector extends Component {
  state = {
    creating: false
  }

  displayInputField = () => {
    this.setState({ creating: true })
  }

  render() {
    return (
      <div className="room-selector">
        { !this.state.creating &&
          <div>
            { this.props.rooms.length > 0 &&
              <h2>Join a room</h2>
            }
            { this.props.rooms.length == 0 &&
              <h2>No rooms available</h2>
            }
            { this.props.rooms.map(room => <Room key={room.name} room={room} setRoom={this.props.setRoom} />) }
          </div>
        }
        <RoomSelectorCreateRoom creating={this.state.creating} onCreateRoom={this.props.onCreateRoom} displayInputField={this.displayInputField} />
      </div>
    );
  }
}

export default RoomSelector;
