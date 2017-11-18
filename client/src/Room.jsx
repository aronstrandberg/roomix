import React, { Component } from 'react';

class Room extends Component {
  onClick = () => {
    this.props.setRoom(this.props.room);
  }
  render() {
    const { room } = this.props;
    return (
      <div className="room-selector-room">
        <h2>
          <a className="room-selector-room-button" onClick={this.onClick}>
            { room.name }
          </a>
        </h2>
      </div>
    );
  }
}

export default Room;
