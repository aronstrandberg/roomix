import React, { Component } from 'react';
import {getId} from './helpers';

class PlayerAlbumName extends Component {
  render () {
    const name = this.props.album.name;
    const uri = this.props.album.uri;
    const url = "https://open.spotify.com/album/" + getId(uri);
    return (
      <a href={url}>
        <h2 className="player player-album-name">
          {name}
        </h2>
      </a>
    );
  }
}

export default PlayerAlbumName;