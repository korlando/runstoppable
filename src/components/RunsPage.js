import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getSortedRunsByStart from '../selectors/getSortedRunsByStart';
import RunBox from './RunBox';

const mapStateToProps = (state) => {
  return {
    runs: getSortedRunsByStart(state)
  };
};

@connect(mapStateToProps)
export default class RunsPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { runs } = this.props;

    return (
      <div className="page-container">
        <h1 className="text-center">RUNS</h1>
        { runs.map((run) => {
          return (
            <RunBox key={run.id} run={run}/>
          );
        })}
      </div>
    );
  };
};