import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    return (
      <div className="page-container">
        <h2>{run.location}</h2>
      </div>
    );
  };
};