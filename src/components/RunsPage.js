import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleMenu, filterRuns } from '../util';
import FlipMove from 'react-flip-move';

import sortValueToName from '../constants/sortValueToName';
import getSortedRuns from '../selectors/getSortedRuns';

import RunBox from './RunBox';
import AllRunsSortMenu from './Menus/AllRunsSortMenu';

const mapStateToProps = (state) => {
  const { allRunsSort } = state.run;
  let sortValue, reversed;

  if(allRunsSort[0] === '-') {
    sortValue = allRunsSort.slice(1);
    reversed = true;
  } else {
    sortValue = allRunsSort;
    reversed = false;
  }
  let runs = getSortedRuns(state, { key: sortValue });
  if(reversed) {
    runs = [...runs].reverse();
  }

  return {
    runs,
    showSortMenu: state.menu.AllRunsSortMenu,
    allRunsSort,
    sortValue,
    reversed
  };
};

export default withRouter(
@connect(mapStateToProps)
class RunsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredRuns: []
    }
  };

  render() {
    const { runs,
            location,
            sortValue,
            reversed,
            showSortMenu } = this.props;
    const { filteredRuns } = this.state;
    const style = {};
    if(location.pathname !== '/runs') {
      style.visibility = 'hidden';
    }

    return (
      <div className="page-container" style={style}>
        <div className="flexbox align-items-center"
          style={{ marginBottom: '10px' }}>
          <h1 className="flex0" style={{
            border: 'none',
            margin: '0',
            padding: '0',
            marginRight: '20px'
          }}>Runs</h1>
          <div className="flex0 relative"
            style={{ marginTop: '16px', marginRight: '15px' }}
            onClick={e => toggleMenu('AllRunsSortMenu', e)}>
            <label className="text-light"
              style={{
                fontSize: '12px',
                marginBottom: '-3px',
                position: 'absolute',
                bottom: '100%',
                left: '0'
              }}>
              Sort By
            </label>
            <div className="hover-blue flexbox align-items-center">
              {sortValueToName[sortValue]}
              <i className="material-icons">
                {reversed ? 'arrow_downward' : 'arrow_upward'}
              </i>
            </div>
            { showSortMenu &&
              <AllRunsSortMenu/>
            }
          </div>
          <div className="flex0">
            <div className="input-group">
              <input type="text"
                className="form-control"
                placeholder="Filter..."
                ref={input => this.filterBox = input}
                onKeyUp={() => {
                  this.setState({ filteredRuns: filterRuns(runs, this.filterBox.value) })
                }}/>
            </div>
          </div>
        </div>
        <FlipMove
          enterAnimation="fade"
          leaveAnimation="fade"
          staggerDurationBy={10}>
          { runs.map((run) => {
            if (filteredRuns.indexOf(run.id) == -1){
              return <div key={run.id}><RunBox run={run}/></div>;
            }
          })}
        </FlipMove>
      </div>
    );
  };
});