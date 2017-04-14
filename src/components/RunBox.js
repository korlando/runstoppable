import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RunBox extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { run } = this.props;
    return (
      <div className="run-box flexbox">
        <Link to={`/runs/${run.id}`} className="flex0">
          <div className="preview-map text-center">(map preview)</div>
        </Link>
        <div className="flex1">
          <label>{run.location}</label>
          <div>{run.start.format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
      </div>
    );
  };
};