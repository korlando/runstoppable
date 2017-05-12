import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrendChart from './Charts/TrendChart';
import metrics from '../constants/metrics';
import { toggleMenu } from '../util';

import sortValueToName from '../constants/sortValueToName';
import TrendsSortMenu from './Menus/TrendsSortMenu';

const mapStateToProps = (state) => {
  return {
    showSortMenu: state.menu.TrendsSortMenu,
  };
};

@connect(mapStateToProps)
export default class TrendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {sortValue: "daily"}
  };

  render() {
    const { sortValue } = this.state;
    const { showSortMenu } = this.props;
    return (
      <div className="page-container">
        <div className="flexbox align-items-center"
          style={{ marginBottom: '10px' }}>
          <h1 className="flex0 m0 p0" style={{
            border: 'none',
            marginRight: '20px'
          }}>Trends</h1>
          <div className="flex0 relative"
            style={{ marginTop: '16px', marginRight: '15px' }}
            onClick={e => toggleMenu('TrendsSortMenu', e)}>
            <label className="text-light fs12 absolute"
              style={{
                marginBottom: '-3px',
                bottom: '100%',
                left: '0'
              }}>
              View
            </label>
            <div className="hover-blue flexbox align-items-center">
              {sortValueToName[sortValue]}
            </div>
            { showSortMenu &&
              <TrendsSortMenu
                sortValue={sortValue}
                callback={(newSortValue) => {this.setState({ sortValue: newSortValue})}}
              />
            }
          </div>
        </div>
        { metrics.map((metric) => {
          const clusterType = (metric.key === 'distance') ?
            'total' : 'average';
          const dayClusterSize = (sortValue == "daily" ? 1 : (sortValue == "weekly" ? 7 : 30));
          return (
            <TrendChart
              key={metric.key}
              chartTitle={metric.title}
              icon={metric.icon}
              xTitle="Date"
              yTitle={`${metric.title} (${metric.units})`}
              metric={metric.key}
              dayClusterSize={dayClusterSize}
              clusterType={clusterType}
              color={metric.color}/>
          );
        })}
      </div>
    );
  };
};