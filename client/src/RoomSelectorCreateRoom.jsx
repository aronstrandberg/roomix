import React, { Component } from 'react'

import RoomSelectorCreateRoomButton from './RoomSelectorCreateRoomButton'
import RoomSelectorCreateRoomInput from './RoomSelectorCreateRoomInput'

import { createRoom, getRoom } from './services'

class RoomSelectorCreateRoom extends Component {
  state = {
    creating: false,
    value: ''
  }

  displayInputField = () => {
    this.setState({ creating: true })
  }

  onChange = (event) => {
    const value = event.target.value;
    this.setState({ value: value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.submit();
  }

  submit = () => {
    createRoom(this.state.value).then(created => {
      getRoom(this.state.value).then(result => {
        this.props.onCreateRoom(result);
      })
    })
  }

  render() {
    return (
      <div className="room-selector-create-room">
        {
          !this.state.creating &&
          <RoomSelectorCreateRoomButton onClick={this.displayInputField} />
        }
        {
          this.state.creating && (
            <form onSubmit={this.onSubmit}>
              <RoomSelectorCreateRoomInput onChange={this.onChange} />
            </form>
          )
        }
      </div>
    )
  }
}

export default RoomSelectorCreateRoom;
