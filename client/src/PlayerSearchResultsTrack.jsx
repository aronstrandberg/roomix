import React, { Component } from 'react';

class PlayerSearchResultsTrack extends Component {
  onClick = () => {
    this.props.onClick(this.props.track.uri);
  }

  render() {
    const { track } = this.props;

    return (
      <div className="player-search-results-track">
        <a onClick={this.onClick}>
          <p>{ track.name } – { this.artists() }</p>
        </a>
      </div>
    )
  }

  artists = () => {
    const { track } = this.props;
    return track.artists.map(a => a.name).join(", ");
  }
}

export default PlayerSearchResultsTrack;
