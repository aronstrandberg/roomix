import React, { Component } from 'react';
import {getId} from './helpers';

class PlayerTrack extends Component {
  parseTrackName () {
    return this.props.track.name.split("(feat")[0];
  }
  render () {
    const uri = this.props.track.uri;
    const url = "https://open.spotify.com/track/" + getId(uri);
    return (
      <a href={url}>
        <h1 className="player player-track">{this.parseTrackName()}</h1>
      </a>
    );
  }
}

export default PlayerTrack;