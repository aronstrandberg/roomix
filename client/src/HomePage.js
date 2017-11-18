import React, { Component } from 'react';

import AdminView from './AdminView'
import RegularView from './RegularView'
import RoomSelector from './RoomSelector'
import PlayerSearch from './PlayerSearch'

class HomePage extends Component {
  state = {
    roomName: null,
    currentSongUri: ''
  }
  setRoom = (room) => {
    this.setState({
      roomName: room.name
    })
  }
  onCreateRoom = (room) => {
    this.setState({
      roomName: room.name,
      admin: true
    })
  }

  render() {
    const { state } = this.props;
    const rooms = [
      { name: 'Kung-Fu Kenny' },
      { name: 'Cornrow Kenny' },
      { name: 'Lil Chano from 79th' },
    ];
    return (
      <div className="homepage">
        { this.state.roomName &&
          <h2>Current room: { this.state.roomName }</h2>
        }
        <AdminView state={this.props.state} admin={this.state.admin} />
        { this.state.roomName && <RegularView admin={this.state.admin} /> }
        { !this.state.roomName && <RoomSelector rooms={rooms} setRoom={this.setRoom} onCreateRoom={this.onCreateRoom} />}
      </div>
    );
  }
}

export default HomePage;
