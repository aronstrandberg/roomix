import React, { Component } from 'react';

import Room from './Room'
import RoomSelectorCreateRoom from './RoomSelectorCreateRoom'
import './RoomSelector.css'

import { getRooms } from './services'

class RoomSelector extends Component {
  state = {
    rooms: this.props.rooms,
    creating: false
  }
  componentDidMount() {
    //getRooms().then(result => {
    //  this.setState({ rooms: result.rooms })
    //})
  }
  displayInputField = () => {
    this.setState({ creating: true })
  }
  render() {
  console.log(this.props.rooms);
    //const { rooms } = this.state;
    return (
      <div className="room-selector">
        { !this.state.creating &&
          <div>
            <h2>Join a room</h2>
            { this.props.rooms.map(room => <Room key={room.name} room={room} setRoom={this.props.setRoom} />) }
          </div>
        }
        <RoomSelectorCreateRoom creating={this.state.creating} onCreateRoom={this.props.onCreateRoom} displayInputField={this.displayInputField} />
      </div>
    );
  }
}

export default RoomSelector;
