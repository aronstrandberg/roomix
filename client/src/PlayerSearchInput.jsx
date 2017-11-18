import React, { Component } from 'react'

class PlayerSearchInput extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div className="player-search-input-wrapper">
        <h4 className="player-search-input-label">
          Search for an Artist, Song, or Album
        </h4>
        <input className="player player-search-input" name="spotify-search" value={value} onChange={onChange} />
      </div>
    );
  }
}

export default PlayerSearchInput;
