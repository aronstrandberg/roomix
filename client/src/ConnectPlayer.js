import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import HomePage from './HomePage';

class ConnectPlayer extends Component {
  listenForFocusOnWebPlayer() {
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
    if (state === null) {
      ReactDOM.render(this.waitingToStart(), document.getElementById('root'));
    } else {
      ReactDOM.render(
        <HomePage state={state} />,
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

export default ConnectPlayer;
