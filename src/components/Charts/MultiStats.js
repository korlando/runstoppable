import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isBadStat } from '../../util';
import runColors from '../../constants/runColors';

const mapStateToProps = (state) => {
  return {
    runMap: state.run.runMap
  };
};

@connect(mapStateToProps)
export default class MultiStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenRuns: []
    };
  };

  render() {
    const { runMap, stats, text, onRunToggled } = this.props;
    const { hiddenRuns } = this.state;

    return (
      <div className="mb16 fw300">
        <div className="flexbox">
          <label className="flex1">Run</label>
          <label className="flex0">{text}</label>
        </div>
        { stats.map((obj, i) => {
          const run = runMap[obj.id];
          const visible = (hiddenRuns.indexOf(i) < 0);
          const stat = isBadStat(obj.stat) ?
            'Missing Data' : obj.stat;
          
          return run ? (
            <div key={i}
              className="flexbox br3 fs14"
              style={{
                color: 'white',
                marginBottom: '5px',
                padding: '1px 5px',
                cursor: 'pointer',
                backgroundColor: visible ? runColors[i % runColors.length] : "#a7abbb"
              }}
              onClick={() => {
                onRunToggled(i, !visible);
                if(visible) {
                  this.setState({
                    hiddenRuns: [...hiddenRuns, i]
                  });
                } else {
                  this.setState({
                    hiddenRuns: hiddenRuns.filter(traceId => {
                      return traceId !== i;
                    })
                  });
                }
              }}>
              <div className="flex1">
                {run.location} {run.start.format('M/D/YY h:mm a')}
              </div>
              <div className="flex0">{stat}</div>
            </div>
          ) : null;
        })}
      </div>
    );
  };
};