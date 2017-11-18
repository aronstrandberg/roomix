import React, { Component } from 'react';

class PlayerAlbumArt extends Component {
  render () {
    return (
      <div className="player player-album-art">
        <img src={this.props.image_url} />
      </div>
    );
  }
}

export default PlayerAlbumArt;