import React, { Component } from 'react';

import Player from './Player'
import RoomSelector from './RoomSelector'
import PlayerSearch from './PlayerSearch'

class HomePage extends Component {
  state = {
    roomId: null,
    currentSongUri: ''
  }
  setRoom = (id) => {
    this.setState({
      roomId: id
    })
  }

  playTrack = (uri) => {
    window.App.playTrack(uri).then(result => {
      console.log(result)
    })
  }

  render() {
    const { state } = this.props;
    const rooms = [
      { id: '123', name: 'Kung-Fu Kenny' },
      { id: '124', name: 'Cornrow Kenny' },
      { id: '125', name: 'Lil Chano from 79th' },
    ];
    return (
      <div className="homepage">
        <PlayerSearch onSelect={this.playTrack} />
        { this.state.roomId && <Player state={state} /> }
        { !this.state.roomId && <RoomSelector rooms={rooms} setRoom={this.setRoom} />}
      </div>
    );
  }
}

export default HomePage;
