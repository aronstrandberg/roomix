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
        <RadarGraph />
        <Vote name={this.props.name} />
      </div>
    )
  }
}

export default RegularView
