/* global window.App, React, ReactDOM */

/**
 * (C) 2017 Spotify AB
 */

/********************************
 ********************************
 ******** REACT CLASSES *********
 ********************************
 ********************************/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Authorize extends Component {
  render () {
    return (
      <div className="screen">
        <button className="btn btn-lg btn-primary" onClick={window.App.sendToLogin}>Log in with Spotify</button>
      </div>
    );
  }
}

class ConnectPlayer extends Component {
  listenForFocusOnWebPlayer() {
    // let this = this;
    let stateHandlerCallback = (state) => {
      this.stateHandler(state);
    };

    // Call once when connected
    window.App.WebPlaybackSDK.getCurrentState().then(stateHandlerCallback);

    // When a change is made
    window.App.WebPlaybackSDK.on("player_state_changed", stateHandlerCallback);

    // Poll status every 0.1 seconds
    // This is just to improve the UI for the progress bar
    setInterval(() => {
      window.App.WebPlaybackSDK.getCurrentState().then(stateHandlerCallback);
    }, 100);
  }
  waitingToStart() {
    let player_name = window.App.WebPlaybackSDK._options.name;

    return (
      <div className="screen screen-connect-player">
        <div className="icon grid-loading-icon">
          <span className="visually-hidden">Loading</span>
        </div>
        <br />
        <h1>Select <span className="spotify-green">{player_name}</span> on Spotify Connect ...</h1>
      </div>
    );
  }
  stateHandler(state) {
    console.log("statehandler")
    if (state === null) {
      ReactDOM.render(this.waitingToStart(), document.getElementById('root'));
    } else {
      ReactDOM.render(
        <Player state={state} />,
        document.getElementById('root')
      );
    }
  }
  render() {
    this.listenForFocusOnWebPlayer(); // Start waiting to hear back from window.App.WebPlaybackSDK
    window.App.transferPlayback();          // Transfer playback to SDK (via Connect Web API over HTTP)
    return this.waitingToStart();     // Render a waiting screen
  }
}

class PlayerError extends Component {
  render () {
    return (
      <div className="screen screen-error">
        <div className="alert alert-danger">
          <h3>{this.props.heading}</h3>
          <p>{this.props.message}</p>
        </div>
      </div>
    );
  }
}

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
            {/*<PlayerSearch />*/}
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
      </div>
    );
  }
}

class PlayerProgress extends Component {
  parseTime (seconds) {
    seconds = seconds / 1000;
    return [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
    ].join(":").replace(/\b(\d)\b/g, "0$1");
  }
  renderPosition () {
    if (this.props.showPosition === true) {
      return (<span className="position">{this.parseTime(this.props.state.position)}</span>);
    } else {
      return null;
    }
  }
  renderDuration () {
    if (this.props.showDuration === true) {
      return (<span className="duration">{this.parseTime(this.props.state.duration)}</span>);
    } else {
      return null;
    }
  }
  render () {
    let progress_perc    = (this.props.state.position / this.props.state.duration) * 100;
    let styles           = {'width': progress_perc + '%'};

    return (
      <div className="player player-progress">
        {this.renderPosition()}
        <span className="progress-bar" style={styles}></span>
        {this.renderDuration()}
      </div>
    );
  }
}

class PlayerAlbumArt extends Component {
  render () {
    return (
      <div className="player player-album-art">
        <img src={this.props.image_url} />
      </div>
    );
  }
}

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

class PlayerBackgroundAlbumArt extends Component {
  render() {
    let style = {
      backgroundImage: `url(${this.props.image_url})`,
      backgroundSize: '200% auto',
      backgroundPosition: 'center center'
    };

    return (<div className="screen screen-player-album-art" style={style}></div>);
  }
}

// class PlayerSearch extends Component {
//   getInitialState() {
//     return {
//       value: ''
//     };
//   }
//   onChange(value) {
//     this.setState({ value: value })
//   }
//   search() {
//     window.App.searchTrack(this.state.value)
//   }
//   render() {
//     return (
//       <div className="player player-search">
//         <PlayerSearchInput value={this.state.value} onChange={this.onChange} />
//         <button onClick={this.search}>Search</button>
//       </div>
//     );
//   }
// }

// class PlayerSearchInput extends Component {
//   render() {
//     const { value, onChange } = this.props;
//     return (
//       <input className="player player-search-input" name="spotify-search" value={value} onChange={onChange} />
//     );
//   }
// }

//// HELPERS
function getId(uri) {
  return uri.split(":")[2];
}

export {
  Authorize,
  ConnectPlayer,
  PlayerError
}
