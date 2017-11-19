import React, { Component } from 'react'
import Player from './Player'
import Authorize from './Authorize'

class AdminView extends Component {
  render() {
    if (this.props.admin) {
      return (
        <Player
          state={this.props.state}
          onTrackNearingEnd={this.props.searchNextTrack}
          onTrackEnd={this.props.onTrackEnd}
          />
      )
    } else {
      return null;
    }
  }
}

export default AdminView;
