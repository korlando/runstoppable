import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigTime from './BigTime';
import BigStat from './BigStat';

const mapStateToProps = (state) => {
  return {

  };
};

@connect(mapStateToProps)
export default class DashStats extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {  } = this.props;
    
    return (
      <div>
        <h3>Welcome back, Ron</h3>
        <div className="dashboard-stats">
          <table className="dash-stats-table" style={{fontSize: '24px'}}>
            <thead>
              <tr>
                <td className="text-light"></td>
                <td className="text-light">Time</td>
                <td className="text-light">Distance</td>
                <td className="text-light">Pace</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-light">Past day</td>
                <th><BigTime hours="2" minutes="05"/></th>
                <th><BigStat stat="27" units="km"/></th>
                <th><BigStat stat="13.41" units="km/h"/></th>
              </tr>
              <tr>
                <td className="text-light">Past week</td>
                <th><BigTime hours="9" minutes="02"/></th>
                <th><BigStat stat="122" units="km"/></th>
                <th><BigStat stat="13.65" units="km/h"/></th>
              </tr>
              <tr>
                <td className="text-light">Past month</td>
                <th><BigTime hours="34" minutes="58"/></th>
                <th><BigStat stat="441" units="km"/></th>
                <th><BigStat stat="13.69" units="km/h"/></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
};