import React, { Component } from 'react'
import RadarGraph from './RadarGraph'
import Vote from './Vote'

import './fuckyoujövlahelvete.css'

class RegularView extends Component {
  render() {
    if (this.props.admin) {
      return null;
    }

    const track = 'banan song'//this.props.playerState.track_window.current_track;
    return (
      <div className="regular-view">
        <div className="regular-view-now-playing">
            <h2>Now playing: { track.name } – { track }</h2>
        </div>
        <RadarGraph room={this.props.room}  />
        <Vote name={this.props.room.name} onVote={this.props.onVote} />
      </div>
    )
  }
}

export default RegularView
