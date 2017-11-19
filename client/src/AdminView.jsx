import React, { Component } from 'react'
import Player from './Player'
import Authorize from './Authorize'

import { findRecommendedTrack } from './helpers'

class AdminView extends Component {
  searchNextTrack = () => {
    const uri = this.props.state.track_window.current_track.uri
    findRecommendedTrack(uri, this.props.room).then(result => {
      // TODO: play track
    })
  }
  render() {
    if (this.props.admin) {
      return (
        <Player state={this.props.state} onTrackNearingEnd={this.searchNextTrack} />
      )
    } else {
      return null;
    }
  }
}

export default AdminView;
