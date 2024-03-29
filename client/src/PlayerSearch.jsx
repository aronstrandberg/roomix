import React, { Component } from 'react'

import PlayerSearchInput from './PlayerSearchInput'
import PlayerSearchResults from './PlayerSearchResults'
import './PlayerSearch.css'

import { playTrack } from './helpers'

class PlayerSearch extends Component {
  state = {
    value: '',
    tracks: [],
    displayResults: true
  }

  onChange = (event) => {
    const value = event.target.value;
    this.setState({ value: value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.search();
  }

  onSelect = (uri) => {
    playTrack(uri);
    this.setDisplayResults(false);
  }

  setDisplayResults = (value) => {
    this.setState({
      displayResults: value
    });
  }

  search = () => {
    window.App.searchTracks(this.state.value).then(results => {
      const tracks = results.tracks.items;
      this.setState({
        tracks: tracks,
        displayResults: true
      })
    })
  }

  render() {
    return (
      <div className="player player-search">
        <form onSubmit={this.onSubmit}>
          <PlayerSearchInput value={this.state.value} onChange={this.onChange} />
        </form>
        { this.state.displayResults &&
          <PlayerSearchResults tracks={this.state.tracks} onClick={this.onSelect} />
        }
      </div>
    )
  }
}

export default PlayerSearch;
