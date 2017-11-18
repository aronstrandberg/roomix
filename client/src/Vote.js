import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip' // npm install react-tooltip
import { vote } from './services'
import './Vote.css'

class Vote extends Component {
    
    onClickValence = (value) => {
        if(value){
            vote(this.props.name, 0, 1, 0)
        }
        else{
            vote(this.props.name, 0, -1, 0)

        }
  }
    onClickDance = (value) => {
        if(value){
            vote(this.props.name, 1, 0, 0)
        }
        else{
            vote(this.props.name, -1, 0, 0)

        }
    }
    onClickInstr = (value) => {
        if(value){
            vote(this.props.name, 0, 0, 1)
        }
        else{
            vote(this.props.name, 0, 0, 1)

        }
    }

  render() {
    return (
        <div className="attribute-voting">
            <div className="single-attribute">
                <h3 data-tip="valence">Valence</h3>
                <h3>
                    <a className="vote-button" data-tip="Increase" onClick={this.onClickValence(true)}>
                        <i className="fa fa-plus-square"></i>
                    </a>
                    <a className="vote-button" data-tip="Decrease" onClick={this.onClickValence(false)}>
                        <i className="fa fa-minus-square"></i>
                    </a>
                </h3>
            </div>
            <div className="single-attribute">
                <h3 data-tip="Danceability">Danceability</h3>
                <h3>
                    <a className="vote-button" onClick={this.onClickDance(true)}>
                        <i className="fa fa-plus-square"></i>                    
                    </a>
                    <a className="vote-button" onClick={this.onClickDance(false)}>
                        <i className="fa fa-minus-square"></i>
                    </a>
                </h3>
            </div>
            <div className="single-attribute">
                <h3 data-tip="Instrumentalness">Instrumentalness</h3>
                <h3>
                    <a className="vote-button" onClick={this.onClickInstr(true)}>
                        <i className="fa fa-plus-square"></i>
                    </a>
                    <a className="vote-button" onClick={this.onClickInstr(false)}>
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