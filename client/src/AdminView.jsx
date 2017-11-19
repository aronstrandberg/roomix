import React, { Component } from 'react'
import Player from './Player'

class AdminView extends Component {
  render() {
    if (this.props.admin) {
      return (
        <Player state={this.props.state} /> 
      )
    } else {
      return null;
    }
  }
}

export default AdminView;
