import React, { Component } from 'react';
import { connect } from 'react-redux';
import getMostRecentRun from '../selectors/getMostRecentRun';
import PaceChart from './Charts/PaceChart';

const mapStateToProps = (state) => {
  return {
    mostRecentRun: getMostRecentRun(state)
  };
};

@connect(mapStateToProps)
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { mostRecentRun } = this.props;
    
    return (
      <div className="page-container">
        <h1 className="text-center">RUNSTOPPABLE</h1>
        { mostRecentRun &&
          <PaceChart runId={mostRecentRun.id}/>
        }
      </div>
    );
  };
};