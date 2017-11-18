import React, { Component } from 'react';

import PlayerSearchResultsTrack from './PlayerSearchResultsTrack'

class PlayerSearchResults extends Component {
  render() {
    const { tracks, onClick } = this.props;

    return (
      <div className="player-search-results">
        { tracks.map(track => (
          <PlayerSearchResultsTrack key={track.uri} track={track} onClick={onClick} />
        ))}
      </div>
    )
  }
}

export default PlayerSearchResults;
