import React, { Component } from 'react'

import RoomSelectorCreateRoomButton from './RoomSelectorCreateRoomButton'
import RoomSelectorCreateRoomInput from './RoomSelectorCreateRoomInput'
import Authorize from './Authorize';
import { createRoom } from './services'

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
    createRoom(this.state.value).then(room => {
      this.props.onCreateRoom(room);
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
          !this.state.creating &&
          <RoomSelectorCreateRoomButton onClick={this.displayInputField} />
        }
        {
          this.state.creating && (
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
