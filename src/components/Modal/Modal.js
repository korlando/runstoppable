import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import getSortedRunsByStart from '../../selectors/getSortedRunsByStart';
import RunBox from '../RunBox';

const mapStateToProps = (state) => {
  return {
    runs: getSortedRunsByStart(state),
    checkedRuns: state.checkedRuns
  };
};

@connect(mapStateToProps)
export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRuns: [],
      runs: []
    }
  };

  render() {
    const { runs, checkedRuns } = this.props;

    return (
      <div className="modal-custom" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-center">Select runs to compare</h3>
        </div>
        <div className="modal-scroll-view">
          { runs.map((run) => {
            return (
              <RunBox key={run.id} run={run} checkable={true}/>
            );
          })}
        </div>
        <div className="modal-footer">
          <button className="btn btn-default">Compare</button>
          <button className="btn btn-default" onClick={ toggleModal }>Cancel</button>
        </div>
      </div>
    );
  };
};