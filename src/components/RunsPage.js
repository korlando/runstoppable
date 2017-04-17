import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getSortedRunsByStart from '../selectors/getSortedRunsByStart';
import RunBox from './RunBox';

const mapStateToProps = (state) => {
  return {
    runs: getSortedRunsByStart(state)
  };
};

export default withRouter(
@connect(mapStateToProps)
class RunsPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { runs, location } = this.props;
    const style = {};
    if(location.pathname !== '/runs') {
      style.visibility = 'hidden';
    }

    return (
      <div className="page-container" style={style}>
        <h1 className="text-center">RUNS</h1>
        { runs.map((run) => {
          return (
            <RunBox key={run.id} run={run}/>
          );
        })}
      </div>
    );
  };
});