import React, { Component } from 'react';
import {getId} from './helpers';

class PlayerArtists extends Component {
  artists = () => this.props.artists.map(a => a.name).join(", ")

  render () {
    const uri = this.props.artists[0].uri;
    const url = "https://open.spotify.com/artist/" + getId(uri);
    return (
      <div className="player player-artists">
        <a href={url}>
          <p>{ this.artists() }</p>
        </a>
      </div>
    );
  }
}

export default PlayerArtists;
