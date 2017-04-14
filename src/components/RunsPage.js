import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    runMap: state.run.runMap
  };
};

@connect(mapStateToProps)
export default class RunsPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { runMap } = this.props;

    return (
      <div className="page-container">
        <h1 className="text-center">RUNS</h1>
        { Object.keys(runMap).map((id) => {
          return (
            <div key={id}>
              <div>{runMap[id].start.format('MMMM Do YYYY, h:mm:ss a')}</div>
            </div>
          );
        })}
      </div>
    );
  };
};