import React, { Component } from 'react';

import PlayerAlbumArt from './PlayerAlbumArt'
import PlayerAlbumName from './PlayerAlbumName'
import PlayerProgress from './PlayerProgress'
import PlayerTrack from './PlayerTrack'
import PlayerArtists from './PlayerArtists'
import PlayerControls from './PlayerControls'
import PlayerBackgroundAlbumArt from './PlayerBackgroundAlbumArt'
import PlayerSearch from './PlayerSearch'
import RadarGraph from './RadarGraph'
import Vote from './Vote'

class Player extends Component {
  current_track() {
    return this.props.state.track_window.current_track;
  }
  render() {
    let track = this.current_track();
    let image = track.album.images[2];
    let album = track.album;

    return (
      <div className="screen screen-player">
        <div className="player">
          <div className="row">
            <div className="col-sm-12">
              <PlayerSearch />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <PlayerAlbumArt image_url={image.url} />
              <PlayerAlbumName album={album} />
            </div>
            <div className="col-sm-9">
              <PlayerProgress state={this.props.state} showPosition={true} showDuration={true} />
              <PlayerTrack track={track} />
              <PlayerArtists artists={track.artists} />
              <PlayerControls state={this.props.state} />
            </div>
          </div>
        </div>

        <PlayerBackgroundAlbumArt image_url={image.url} />
        <RadarGraph />
        <Vote />

        </div>
    );
  }
}

export default Player;
