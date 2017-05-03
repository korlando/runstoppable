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
    this.state = {
      hiddenRuns: []
    }
  };

  render() {
    const { runMap, avgData, text, onRunToggled } = this.props;
    const { hiddenRuns } = this.state;

    return (
      <div>
        { avgData.map((obj, i) => {
          const run = runMap[obj.id];
          const visible = (hiddenRuns.indexOf(i) < 0);
          return run ? (
            <div key={i}
              className="flexbox"
              style={{
                color: 'white',
                borderRadius: '3px',
                marginBottom: '5px',
                padding: '1px 5px',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: visible ? runColors[i % runColors.length] : "#a7abbb"
              }}
              onClick={() => {
                onRunToggled(i, !visible);
                if (visible) {
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
              <div className="flex1">{run.location} {run.start.format('M/D/YY h:mm a')}</div>
              <div className="flex0">{text} {obj.avg}</div>
            </div>
          ) : null;
        })}
      </div>
    );
  };
};