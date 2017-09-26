import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editAllRunsSort } from '../../util';

const sortOptions = [{
  name: 'Start Date',
  value: 'start'
}, {
  name: 'Location',
  value: 'location'
}, {
  name: 'Total Distance',
  value: 'distance'
}];

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

  return {
    allRunsSort,
    sortValue,
    reversed
  };
};

@connect(mapStateToProps)
export default class AllRunsSortMenu extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(value) {
    const { sortValue, reversed } = this.props;
    let newSort;

    if(value === sortValue) {
      newSort = reversed ? value : `-${value}`;
    } else {
      newSort = value;
    }
    editAllRunsSort(newSort);
  };

  render() {
    const { sortValue, reversed } = this.props;
    return (
      <div className="popover-menu all-runs-sort-menu"
        onClick={e => e.stopPropagation()}>
        <div className="item-list">
          { sortOptions.map((option, i) => {
            return (
              <div key={i}
                className={`flexbox align-items-center item
                  ${sortValue === option.value ? ' active' : ''}`}
                onClick={() => this.handleClick(option.value)}>
                <span className="flex1">{option.name}</span>
                <i className="flex0 direction-arrow material-icons">{reversed ? 'arrow_downward' : 'arrow_upward'}</i>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
};