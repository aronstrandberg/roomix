import Radar from 'react-d3-radar';
import React, { Component } from 'react';

class RadarGraph extends Component {
  render() {
    return (
      <div className="radarstyle">
        <Radar
          width={500}
          height={500}
          padding={100}
          domainMax={1}
          highlighted={null}
          onHover={(point) => {
            if (point) {
              console.log('hovered over a data point');
            } else {
              console.log('not over anything');
            }
          }}
          data={{
            variables: [
              {key: 'valence', label: 'Valence'},
              {key: 'danceability', label: 'Danceability'},
              {key: 'instrumentalness', label: 'Instrumentalness'},
            ],
            sets: [
              {
                key: 'roomName',
                label: 'Music Attributes',
                values: {
                  valence: this.props.room.valens,
                  danceability: this.props.room.dance,
                  instrumentalness: this.props.room.instr,
                },
              },
            ],
          }}
        />
      </div>
    )
  }
}

export default RadarGraph;
