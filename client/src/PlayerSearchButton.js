import React, { Component } from 'react'

class PlayerSearchButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className="player player-search-button btn btn-sm btn-primary" onClick={onClick}>
        Search
      </button>
    );
  }
}

export default PlayerSearchButton;
