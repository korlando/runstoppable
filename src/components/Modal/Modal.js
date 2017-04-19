import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import getSortedRunsByStart from '../../selectors/getSortedRunsByStart';
import RunBox from '../RunBox';

const mapStateToProps = (state) => {
  return {
    runs: getSortedRunsByStart(state)
  };
};

@connect(mapStateToProps)
export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRuns: []
    };
  };

  render() {
    const { runs } = this.props;
    const { checkedRuns } = this.state;

    return (
      <div className="modal-custom" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-center">Select runs to compare</h3>
        </div>
        <div className="modal-scroll-view">
          { runs.map((run) => {
            return (
              <RunBox key={run.id}
                run={run}
                checkable={true}
                onCheckChange={(checked) => {
                  if(checked) {
                    this.setState({
                      checkedRuns: [...checkedRuns, run.id]
                    });
                  } else {
                    this.setState({
                      checkedRuns: checkedRuns.filter(id => {
                        return id !== run.id;
                      })
                    });
                  }
                }}/>
            );
          })}
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary"
            disabled={checkedRuns.length === 0}>Compare</button>
          <button className="btn btn-default"onClick={ toggleModal }>Cancel</button>
        </div>
      </div>
    );
  };
};