import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import RunBox from './RunBox';

const mapStateToProps = (state) => {
  return {
    runMap: state.run.runMap
  };
};

@connect(mapStateToProps)
export default class StarredRunsPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { runMap } = this.props;
    const starredIds = Object
      .keys(runMap)
      .filter(id => runMap[id].starred);

    return (
      <div className="page-container">
        <h1>Starred Runs</h1>
        { starredIds.length === 0 &&
          <div className="text-center text-light"
            style={{padding: '50px 0'}}>
            <i className="material-icons" style={{fontSize: '60px'}}>star_outline</i>
            <div>None Yet!</div>
          </div>
        }
        <FlipMove
          enterAnimation="fade"
          leaveAnimation="fade"
          staggerDurationBy={10}>
          { starredIds.map((runId) => {
            const run = runMap[runId];
            return <div key={runId}><RunBox run={run}/></div>;
          })}
        </FlipMove>
      </div>
    );
  };
};