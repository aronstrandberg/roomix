import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Authorize from './Authorize';
import ConnectPlayer from './ConnectPlayer';
import PlayerError from './PlayerError';
import HomePage from './HomePage';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
//if (window.App.isAccessToken() === false) {
//    //ReactDOM.render(<Authorize />, document.getElementById('root'));
//    ReactDOM.render(<HomePage state={null}/> , document.getElementById('root'));
//}

ReactDOM.render(<HomePage state={null}/> , document.getElementById('root'));

window.App.onSpotifyPlayerConnected = (data) => {
  ReactDOM.render(<ConnectPlayer />, document.getElementById('root'));
};

window.App.onSpotifyUserSessionExpires = () => {
  window.App.WebPlaybackSDK.disconnect(); // Disconnect the player

  ReactDOM.render(
    <div>
      <PlayerError
        heading="Session expired."
        message="Playback sessions only last 60 minutes. Refresh for new session." />
      <Authorize />
    </div>,
    document.getElementById('root')
  );
};

window.renderWebPlaybackSDKError = (title, e) => {
  ReactDOM.render(
    <PlayerError heading={title} message={e} />,
    document.getElementById('root')
  );
};
