import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip' // npm install react-tooltip
import './Vote.css'

class Vote extends Component {
    onClickValence = () => {
    console.log("Valence")
  }
    onClickDance = () => {
        console.log("Dance")
    }
    onClickInstr = () => {
        console.log("Instr")
    }

  render() {
    return (
        <div className="attribute-voting">
            <div className="single-attribute">
                <h3 data-tip="valence">Valence</h3>
                <h3>
                    <a className="vote-button" data-tip="Increase" onClick={this.onClickValence}>
                        <i className="fa fa-plus-square"></i>
                    </a>
                    <a className="vote-button" data-tip="Decrease" onClick={this.onClickValence}>
                        <i className="fa fa-minus-square"></i>
                    </a>
                </h3>
            </div>
            <div className="single-attribute">
                <h3 data-tip="Danceability">Danceability</h3>
                <h3>
                    <a className="vote-button" data-tip="Increase" onClick={this.onClickDance}>
                        <i className="fa fa-plus-square"></i>
                    </a>
                    <a className="vote-button" data-tip="Decrease" onClick={this.onClickDance}>
                        <i className="fa fa-minus-square"></i>
                    </a>
                </h3>
            </div>
            <div className="single-attribute">
                <h3 data-tip="Instrumentalness" >Instrumentalness</h3>
                <h3>
                    <a className="vote-button" data-tip="Increase" onClick={this.onClickInstr}>
                        <i className="fa fa-plus-square"></i>
                    </a>
                    <a className="vote-button" data-tip="Decrease" onClick={this.onClickInstr}>
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
