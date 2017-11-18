import React, { Component } from 'react';
import {getId} from './helpers';

class PlayerArtists extends Component {
  renderArtists () {
    return this.props.artists.map((artist) => {
      const uri = artist.uri;
      const url = "https://open.spotify.com/artist/" + getId(uri);
      return (
        <div className="player player-artist" key={artist.uri}>
          <a href={url}>
            <li>{artist.name}</li>
          </a>
        </div>
      );
    });
  }
  render () {
    return (<ul className="player player-artists">{this.renderArtists()}</ul>);
  }
}

export default PlayerArtists;