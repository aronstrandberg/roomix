import React, { Component } from 'react';

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
            
export default PlayerBackgroundAlbumArt;