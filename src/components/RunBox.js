import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { renderRunPath, dispatchEditRun } from '../util';
import Checkbox from './Checkbox';

class RunBoxInner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingName: false,
      name: props.run && props.run.name
    };
    this.saveName = this.saveName.bind(this);
  };

  componentDidMount() {
    setTimeout(() => {
      renderRunPath(this.map, [this.props.run]);
    });
  };

  componentWillReceiveProps(nextProps) {
    const { run } = nextProps;
    if(run) {
      this.setState({ name: run.name });
    }
  };

  saveName() {
    const { name } = this.state;
    const { run } = this.props;
    dispatchEditRun({ name }, run.id);
    this.setState({ editingName: false });
  };

  render() {
    const { run,
            checkable,
            checked,
            onCheckChange } = this.props;
    const { editingName, name } = this.state;
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
          <div onClick={e => e.stopPropagation()}>
            { !editingName &&
              <div className="flexbox edit-container"
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ editingName: true });
                  setTimeout(() => {
                    if(this.nameInput) {
                      this.nameInput.focus();
                    }
                  }, 100);
                }}>
                <label className="run-name flex0">{run.name}</label>
                <button type="button"
                  className="flex0 edit-btn">
                  <i className="material-icons">mode_edit</i>
                </button>
              </div>
            }
            { editingName &&
              <form onSubmit={(e) => {
               e.preventDefault();
                this.saveName();
              }}>
                <div className="input-group">
                  <input
                    className="run-name form-control"
                    value={name}
                    onChange={e => this.setState({ name: e.target.value })}
                    ref={node => this.nameInput = node}/>
                  <span className="input-group-btn">
                    <button type="submit"
                      className="btn btn-primary">
                      Save
                    </button>
                  </span>
                  <span className="input-group-btn">
                    <button type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        this.setState({
                          editingName: false,
                          name: run.name
                        });
                      }}>
                      Cancel
                    </button>
                  </span>
                </div>
              </form>
            }
          </div>
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

export default withRouter((props) => {
  const { run, checkable, history } = props;
  
  if(checkable) {
    return <RunBoxInner {...props}/>;
  } else {
    return (
      <div onClick={() => history.push(`/runs/${run.id}`)}>
        <RunBoxInner {...props}/>
      </div>
    );
  }
});