import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import getSortedRunsByStart from '../../selectors/getSortedRunsByStart';
import RunBox from '../RunBox';
import Checkbox from '../Checkbox';

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
      checkedRuns: [],
      allChecked: false
    };
  };

  render() {
    const { runs } = this.props;
    const { checkedRuns, allChecked } = this.state;

    return (
      <div className="modal-custom" onClick={e => e.stopPropagation()}>
        <div className="modal-top flexbox align-items-center">
          <h2 className="flex1">Select runs to compare</h2>
          <div className="flex0">
            <Checkbox
              checked={allChecked}
              onCheckChange={(checked) => {
                const newCheckedRuns = checked ?
                  runs.reduce((arr, run) => [...arr, run.id], []) :
                  [];
                this.setState({
                  allChecked: checked,
                  checkedRuns: newCheckedRuns
                });
              }}/>
          </div>
        </div>
        <div className="modal-scroll-view">
          { runs.map((run) => {
            return (
              <RunBox key={run.id}
                run={run}
                checkable={true}
                checked={checkedRuns.includes(run.id)}
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
            disabled={checkedRuns.length < 2}>Compare</button>
          <button className="btn btn-default"onClick={ toggleModal }>Cancel</button>
        </div>
      </div>
    );
  };
};