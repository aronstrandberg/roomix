import React, { Component } from 'react';
import './App.css'

class Authorize extends Component {
  render () {
    return (
      <div className="screen">
        <button className="btn btn-lg btn-primary" onClick={window.App.sendToLogin}>Log in with Spotify</button>
      </div>
    );
  }
}

export default Authorize;
