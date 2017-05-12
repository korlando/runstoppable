import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTrendsSort, toggleMenu } from '../../util';

const sortOptions = [{
  name: 'Daily',
  value: 'daily'
}, {
  name: 'Weekly',
  value: 'weekly'
}, {
  name: 'Monthly',
  value: 'monthly'
}];

export default class AllRunsSortMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(value, e, callback) {
    const { sortValue } = this.props;
    if (value !== sortValue) {
      this.setState({ sortValue: value });
      toggleMenu('TrendsSortMenu', e);
      callback(value);
    }
  };

  render() {
    const { sortValue, callback } = this.props;
    return (
      <div className="popover-menu all-runs-sort-menu"
        onClick={e => e.stopPropagation()}>
        <div className="item-list">
          { sortOptions.map((option, i) => {
            return (
              <div key={i}
                className={`flexbox align-items-center item
                  ${sortValue === option.value ? ' active' : ''}`}
                onClick={(e) => this.handleClick(option.value, e, callback)}>
                <span className="flex1">{option.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
};