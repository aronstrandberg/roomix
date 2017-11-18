import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip' // npm install react-tooltip
import { vote } from './services'
import './Vote.css'

class Vote extends Component {
  increaseValence = () => {
    vote(this.props.name, { valens: 1 })
  }
  decreaseValence = () => {
    vote(this.props.name, { valens: -1 })
  }
  increaseDance = () => {
    vote(this.props.name, { dance: 1 })
  }
  decreaseDance = () => {
    vote(this.props.name, { dance: -1 })
  }
  increaseInstr = () => {
    vote(this.props.name, { instr: 1 })
  }
  decreaseInstr = () => {
    vote(this.props.name, { instr: -1 })
  }

  render() {
    return (
        <div className="attribute-voting">
            <div className="single-attribute">
                <h3 data-tip="valence">Valence</h3>
                <h3>
                    <a className="vote-button" data-tip="Increase" onClick={this.increaseValence}>
                        <i className="fa fa-plus-square"></i>
                    </a>
                    <a className="vote-button" data-tip="Decrease" onClick={this.decreaseValence}>
                        <i className="fa fa-minus-square"></i>
                    </a>
                </h3>
            </div>
            <div className="single-attribute">
                <h3 data-tip="Danceability">Danceability</h3>
                <h3>
                    <a className="vote-button" onClick={this.increaseDance}>
                        <i className="fa fa-plus-square"></i>
                    </a>
                    <a className="vote-button" onClick={this.decreaseDance}>
                        <i className="fa fa-minus-square"></i>
                    </a>
                </h3>
            </div>
            <div className="single-attribute">
                <h3 data-tip="Instrumentalness">Instrumentalness</h3>
                <h3>
                    <a className="vote-button" onClick={this.increaseInstr}>
                        <i className="fa fa-plus-square"></i>
                    </a>
                    <a className="vote-button" onClick={this.decreaseInstr}>
                        <i className="fa fa-minus-square"></i>
                    </a>
                </h3>
            </div>
          <ReactTooltip place="top" type="dark" effect="solid"/>
        </div>
    );
  }
}

export default Vote;
