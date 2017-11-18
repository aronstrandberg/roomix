import React, { Component } from 'react';

class PlayerControls extends Component {
  resume() {
    window.App.WebPlaybackSDK.resume();
  }
  pause() {
    window.App.WebPlaybackSDK.pause();
  }
  previousTrack() {
    window.App.WebPlaybackSDK.previousTrack();
  }
  nextTrack() {
    window.App.WebPlaybackSDK.nextTrack();
  }
  // startFromBeginning() {
  //   window.App.WebPlaybackSDK.seek(0);
  // }
  renderPlayOrPause() {
    if (this.props.state.paused === true) {
      return (<li><a onClick={this.resume} className="fa fa-play"></a></li>);
    } else {
      return (<li><a onClick={this.pause} className="fa fa-pause"></a></li>);
    }
  }

  renderStartFromBeginning() {
    return (<li><a onClick={this.startFromBeginning()} className="fa fa-fast-backward"></a></li>);
  }
  render () {
    let track_id = this.props.state.track_window.current_track.id;
    let track_url = "https://open.spotify.com/track/" + track_id;

    return (
      <ul className="player player-controls">
        <li><a onClick={this.previousTrack} className="fa fa-fast-backward"></a></li>
        {this.renderPlayOrPause()}
        <li><a onClick={this.nextTrack} className="fa fa-fast-forward"></a></li>
      </ul>
    );
  }
}

export default PlayerControls;