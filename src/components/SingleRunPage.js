import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaceChart from './Charts/PaceChart';

const mapStateToProps = (state, ownProps) => {
  return {
    run: state.run.runMap[ownProps.match.params.runId]
  };
};

@connect(mapStateToProps)
export default class SingleRunPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { run } = this.props;
    if(!run) return null;

    return (
      <div className="page-container">
        <div className="flexbox align-items-baseline">
          <h2 style={{marginRight: '10px'}}>{run.location}</h2>
          <h3 style={{color: '#747e95'}}>{run.start.format('MMM D h:mm a')}</h3>
        </div>
        <PaceChart runId={run.id}/>
      </div>
    );
  };
};