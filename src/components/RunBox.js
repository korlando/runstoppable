import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderRunPath } from '../util';
import Checkbox from './Checkbox';

class RunBoxInner extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    setTimeout(() => {
      renderRunPath(this.map, [this.props.run]);
    });
  };

  render() {
    const { run,
            checkable,
            checked,
            onCheckChange } = this.props;
    const style = {};
    if(checkable) {
      style.cursor = 'pointer';
    }

    return (
      <div className={`run-box flexbox${checked ? ' checked' : ''}`}
        onClick={(e) => {
          if(checkable && onCheckChange) {
            const val = this.checkBox.toggle();
            onCheckChange(val);
          }
        }}>
        <div className={`preview-map text-center${checkable ? ' small' : ''}`}
          ref={node => this.map = node}></div>
        <div className="flex1">
          <label className="run-name">{run.name}</label>
          <div className="location">{run.location}</div>
          <div className="date">{run.start.format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
        
        { checkable &&
          <Checkbox
            checked={checked}
            onCheckChange={onCheckChange}
            ref={node => this.checkBox = node}/>
        }
      </div>
    );
  };
};

export default (props) => {
  const { run, checkable } = props;
  
  if(checkable) {
    return <RunBoxInner {...props}/>;
  } else {
    return (
      <Link to={`/runs/${run.id}`}
        style={{ textDecoration: 'none' }}>
        <RunBoxInner {...props}/>
      </Link>
    );
  }
};