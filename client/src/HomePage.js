import React, { Component } from 'react';

import AdminView from './AdminView'
import RegularView from './RegularView'
import RoomSelector from './RoomSelector'
import PlayerSearch from './PlayerSearch'
import socketIOClient from "socket.io-client";
import Authorize from './Authorize'

class HomePage extends Component {
  state = {
    room: {},
    currentSongUri: '',
    endpoint: 'http://127.0.0.1:3001',
    rooms: [],
    admin: false
  }

  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('voteupdates', (data) => {
        var room = JSON.parse(data);
        if(room.name === this.state.room.name){
            this.setRoom(room)
        }
    })
    socket.on('rooms', (data) => {
        var rooms = JSON.parse(data);
        this.setState({rooms});
    })
  }

  setRoom = (room) => {
    this.setState({
      room: room
    })
  }
  onCreateRoom = (room) => {
    console.log("ON CREATE ROOM")
    this.setState({
      room: room,
      admin: true
    })
  }

  render() {
    const { state } = this.props;
    return (
      <div className="homepage">
        { this.state.roomName &&
          <h2>Current room: { this.state.room.name }</h2>
        }
        <AdminView state={this.props.state} admin={this.state.admin} room={this.state.room} />
        { this.state.room.name && <RegularView admin={this.state.admin} room={this.state.room} onVote={this.setRoom} /> }
        { !this.state.room.name && <RoomSelector rooms={this.state.rooms} setRoom={this.setRoom} onCreateRoom={this.onCreateRoom} />}
      </div>
    );
  }

}

export default HomePage;
