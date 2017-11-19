import React, { Component } from 'react';

import AdminView from './AdminView'
import RegularView from './RegularView'
import RoomSelector from './RoomSelector'
import PlayerSearch from './PlayerSearch'
import socketIOClient from "socket.io-client";

class HomePage extends Component {
  state = {
    room: {},
    currentSongUri: '',
    endpoint: 'http://127.0.0.1:3001'
  }
  
  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('voteupdates', (data) => {
        var room = JSON.parse(data);
        if(room.name === this.state.room.name){
            this.setRoom(room)
        }
    })
  }

  setRoom = (room) => {
    this.setState({
      room: room
    })
  }
  onCreateRoom = (name) => {
    this.setState({
      room: { name },
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
        <AdminView state={this.props.state} admin={this.state.admin}/>
        { this.state.room.name && <RegularView admin={this.state.admin} room={this.state.room} onVote={this.setRoom} playerState={this.props.state} /> }
        { !this.state.room.name && <RoomSelector setRoom={this.setRoom} onCreateRoom={this.onCreateRoom} />}
      </div>
    );
  }
}

export default HomePage;
