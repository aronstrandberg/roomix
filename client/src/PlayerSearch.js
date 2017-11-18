import React, { Component } from 'react'

import PlayerSearchInput from './PlayerSearchInput'
import PlayerSearchButton from './PlayerSearchButton'
import PlayerSearchResults from './PlayerSearchResults'
import './PlayerSearch.css'

class PlayerSearch extends Component {
  state = {
    value: '',
    tracks: []
  }

  onChange = (event) => {
    const value = event.target.value;
    console.log(value)
    this.setState({ value: value });
  }

  onSubmit = (event) => {
    console.log("hejje")
    event.preventDefault();
    this.search();
  }

  search = () => {
    console.log("searching!")
    window.App.searchTracks(this.state.value).then(results => {
      const tracks = results.tracks.items;
      console.log(tracks)
      this.setState({
        tracks: tracks
      })
    })
  }

  render() {
    return (
      <div className="player player-search">
        <form onSubmit={this.onSubmit}>
          <PlayerSearchInput value={this.state.value} onChange={this.onChange} />
          {/*<PlayerSearchButton onClick={this.search} />*/}
        </form>
        <PlayerSearchResults tracks={this.state.tracks} />
      </div>
    )
  }
}

export default PlayerSearch;
