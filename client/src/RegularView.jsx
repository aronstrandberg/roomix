import React, { Component } from 'react'
import RadarGraph from './RadarGraph'
import Vote from './Vote'

class RegularView extends Component {
  render() {
    if (this.props.admin) {
      return null;
    }
    return (
      <div className="regular-view">
        <RadarGraph room={this.props.room}  />
        <Vote name={this.props.room.name} onVote={this.props.onVote} />
      </div>
    )
  }
}

export default RegularView
