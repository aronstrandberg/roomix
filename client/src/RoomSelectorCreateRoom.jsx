import React, { Component } from 'react'

import RoomSelectorCreateRoomButton from './RoomSelectorCreateRoomButton'
import RoomSelectorCreateRoomInput from './RoomSelectorCreateRoomInput'
import { createRoom, getRoom } from './services'
import Authorize from './Authorize';

class RoomSelectorCreateRoom extends Component {
  state = {
    value: ''
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

  authorized = () => {
    return !!window.App.isAccessToken();
  }
  render() {
    const isAuthorized = this.authorized();
    return (
      <div className="room-selector-create-room">
        {
          !this.props.creating &&
          <RoomSelectorCreateRoomButton onClick={this.props.displayInputField} />
        }
        {
          this.props.creating && (
            <div>
            {!isAuthorized &&
                <Authorize />
            }
            { isAuthorized &&
            <form onSubmit={this.onSubmit}>
              <RoomSelectorCreateRoomInput onChange={this.onChange} />
            </form>
            }
            </div>
          )
        }
      </div>
    )
  }
}

export default RoomSelectorCreateRoom;
