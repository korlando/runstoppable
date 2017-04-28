import React, { Component } from 'react';
import { connect } from 'react-redux';
import runColors from '../../constants/runColors';

const mapStateToProps = (state) => {
  return {
    runMap: state.run.runMap
  };
};

@connect(mapStateToProps)
export default class MultiAvg extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { runMap, avgData, text } = this.props;

    return (
      <div>
        { avgData.map((obj, i) => {
          const run = runMap[obj.id];
          return run ? (
            <div key={i}
              className="flexbox"
              style={{
                backgroundColor: runColors[i % runColors.length],
                color: 'white',
                borderRadius: '3px',
                marginBottom: '5px',
                padding: '1px 5px',
                fontSize: '14px'
              }}>
              <div className="flex1">{run.location} {run.start.format('M/D/YY h:mm a')}</div>
              <div className="flex0">{text} {obj.avg}</div>
            </div>
          ) : null;
        })}
      </div>
    );
  };
};