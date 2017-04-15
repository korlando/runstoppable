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

    let dateFormat = 'MMM D, h:mm a';
    const thisYear = new Date().getFullYear();
    if(run.start.year() !== thisYear) {
      dateFormat = 'MMM D, YYYY, h:mm a';
    }

    return (
      <div className="page-container">
        <div className="flexbox align-items-baseline">
          <h2 style={{marginRight: '10px'}}>
            {run.location}
          </h2>
          <h3 style={{color: '#747e95'}}>
            {run.start.format(dateFormat)}
          </h3>
        </div>
        <PaceChart runId={run.id}/>
      </div>
    );
  };
};