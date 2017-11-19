import React, { Component } from 'react'
import Player from './Player'
import Authorize from './Authorize'

import { playTrack, findRecommendedTrack, timeLeft, timeToSearch, timeToSwitch } from './helpers'

class AdminView extends Component {
  state = {
    currentTrackUri: null,
    nextTrackUri: null,
    searchingNext: false,
    playingNext: false,
  }

  searchNextTrack = () => {
    const uri = this.props.state.track_window.current_track.uri
    findRecommendedTrack(uri, this.props.room).then(result => {
      const track = result.tracks[0]
      this.setNextTrack(track.uri)
    })
  }

  setNextTrack = (uri) => {
    this.setState({
      nextTrackUri: uri
    })
  }

  playNextTrack = () => {
    playTrack(this.state.nextTrackUri).then(() => {
      this.setState({
        currentTrackUri: this.state.nextTrackUri,
        nextTrackUri: null,
        searchingNext: false,
        playingNext: false
      })
    })
  }

  componentDidUpdate = () => {
    if (this.state.searchingNext === false && timeToSearch(this.props.state)) {
      this.setState({ searchingNext: true }, () => {
        this.searchNextTrack()
      })
    }

    if (this.state.playingNext === false && timeToSwitch(this.props.state)) {
      this.setState({ playingNext: true }, () => {
        this.playNextTrack()
      })
    }
  }

  render() {
    if (this.props.admin) {
      return (
        <Player
          state={this.props.state}
        />
      )
    } else {
      return null;
    }
  }
}

export default AdminView;
