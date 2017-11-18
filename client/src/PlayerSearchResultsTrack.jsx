import React, { Component } from 'react';

class PlayerSearchResultsTrack extends Component {
  render() {
    const { track } = this.props;

    return (
      <div className="player-search-results-track">
        <p>{ track.name } – { this.artists() }</p>
      </div>
    )
  }

  artists = () => {
    const { track } = this.props;
    return track.artists.map(a => a.name).join(", ");
  }
}

export default PlayerSearchResultsTrack;
