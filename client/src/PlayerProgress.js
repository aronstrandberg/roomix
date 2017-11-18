import React, { Component } from 'react';

class PlayerProgress extends Component {
  parseTime (seconds) {
    seconds = seconds / 1000;
    return [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
    ].join(":").replace(/\b(\d)\b/g, "0$1");
  }
  renderPosition () {
    if (this.props.showPosition === true) {
      return (<span className="position">{this.parseTime(this.props.state.position)}</span>);
    } else {
      return null;
    }
  }
  renderDuration () {
    if (this.props.showDuration === true) {
      return (<span className="duration">{this.parseTime(this.props.state.duration)}</span>);
    } else {
      return null;
    }
  }
  render () {
    let progress_perc    = (this.props.state.position / this.props.state.duration) * 100;
    let styles           = {'width': progress_perc + '%'};

    return (
      <div className="player player-progress">
        {this.renderPosition()}
        <span className="progress-bar" style={styles}></span>
        {this.renderDuration()}
      </div>
    );
  }
}

export default PlayerProgress;