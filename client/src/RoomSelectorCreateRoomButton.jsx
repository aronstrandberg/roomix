import React, { Component } from 'react'

class RoomSelectorCreateRoomButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className="player player-room-selector-create-room-button btn btn-lg btn-primary" onClick={onClick}>
        Create Room
      </button>
    );
  }
}

export default RoomSelectorCreateRoomButton;
