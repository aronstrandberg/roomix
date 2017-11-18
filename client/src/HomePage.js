import React, { Component } from 'react';

import Player from './Player'
import RoomSelector from './RoomSelector'

class HomePage extends Component {
  state = {
    roomId: null
  }
  setRoom = (id) => {
    this.setState({
      roomId: id
    })
  }
  render() {
    const { state } = this.props;
    const rooms = [
      { id: '123', name: 'Kung-Fu Kenny' },
    ];
    return (
      <div className="homepage">
        { this.state.roomId && <Player state={state} /> }
        { !this.state.roomId && <RoomSelector rooms={rooms} setRoom={this.setRoom} />}
      </div>
    );
  }
}

export default HomePage;
