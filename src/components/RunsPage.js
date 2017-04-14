import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RunBox from './RunBox';

const mapStateToProps = (state) => {
  return {
    runMap: state.run.runMap
  };
};

@connect(mapStateToProps)
export default class RunsPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { runMap } = this.props;

    return (
      <div className="page-container">
        <h1 className="text-center">RUNS</h1>
        { Object.keys(runMap).map((id) => {
          return (
            <RunBox key={id} run={runMap[id]}/>
          );
        })}
      </div>
    );
  };
};