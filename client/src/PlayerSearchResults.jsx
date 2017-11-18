import React, { Component } from 'react';

import PlayerSearchResultsTrack from './PlayerSearchResultsTrack'

class PlayerSearchResults extends Component {
  render() {
    const { tracks } = this.props;

    return (
      <div className="player-search-results">
        { tracks.map(track => (<PlayerSearchResultsTrack key={track.uri} track={track} />)) }
      </div>
    )
  }
}

export default PlayerSearchResults;
