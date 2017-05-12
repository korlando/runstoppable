import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { renderRunPath,
         dispatchEditRun,
         roundTo,
         toggleModal,
         openModal,
         fetchDB,
         updateDB,
         findUserById,
         updateRunName,
         convertUnits } from '../util';
import getAvgRunData from '../selectors/getAvgRunData';
import metrics from '../constants/metrics';
import modalTypes from '../constants/modalTypes';
import Checkbox from './Checkbox';
import EditRunName from './EditRunName';

class RunBoxInner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingName: false,
    };
    this.saveName = this.saveName.bind(this);
    this.toggleStarred = this.toggleStarred.bind(this);
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

  saveName(name) {
    const { run, USER_ID } = this.props;
    const callback = () => {
      this.setState({ editingName: false });
    };
    updateRunName(name, run, USER_ID, callback);
  };

  toggleStarred(run) {
    fetchDB().then((db) => {
      if(db) {
        const { USER_ID } = this.props;
        const user = findUserById(db, USER_ID);
        if(user) {
          const rid = run.id;
          const runDoc = user.runs.find(r => r.id === rid);
          if(runDoc) {
            runDoc.starred = !run.starred;
            updateDB(db).then(() => {
              dispatchEditRun({starred: !run.starred}, rid);
            }).catch((err) => {

            });
          }
        }
      }
    }).catch((err) => {

    });
  };

  render() {
    const { run,
            checkable,
            checked,
            onCheckChange,
            className,
            user } = this.props;
    const { editingName, name } = this.state;
    const style = {};
    if(checkable) {
      style.cursor = 'pointer';
    }

    return (
      <div className={`run-box flexbox
        ${checked ? ' checked' : ''}
        ${className ? ' ' + className : ''}`}
        onClick={(e) => {
          if(checkable && onCheckChange) {
            const val = this.checkBox.toggle();
            onCheckChange(val);
          }
        }}>
        <div className="preview-map text-center"
          ref={node => this.map = node}></div>
        <div className="flex1">
          <div className="flexbox">
            <div className="flex1">
              <div className="flexbox align-items-center">
                { !editingName &&
                  <div className="flex1 flexbox edit-container">
                    <label className="run-name flex0">{run.name}</label>
                    <button type="button"
                      className="flex0 edit-btn"
                      onClick={e => {
                        e.stopPropagation();
                        this.setState({ editingName: true });
                      }}>
                      <i className="material-icons">mode_edit</i>
                    </button>
                  </div>
                }
                { editingName &&
                  <EditRunName
                    run={run}
                    onSave={this.saveName}
                    onCancel={() => this.setState({ editingName: false })}/>
                }
                { !checkable &&
                  <div className={`flex0 run-star
                    ${run.starred ? ' starred' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.toggleStarred(run);
                    }}>
                    <i className="material-icons">
                      {run.starred ? 'star' : 'star_outline'}
                    </i>
                  </div>
                }
              </div>
              <div className="location flexbox align-items-center">
                <i className="material-icons text-light">location_on</i>
                {run.location}
              </div>
              <div className="date flexbox align-items-center">
                <i className="material-icons text-light">access_time</i>
                {run.startFormatted}
              </div>
            </div>
            { checkable &&
              <div className="flex0">
                <Checkbox
                  checked={checked}
                  onCheckChange={onCheckChange}
                  ref={node => this.checkBox = node}/>
              </div>
            }
          </div>
          
          <div className="flexbox flex-wrap metrics">
            { metrics.map((metric) => {
              const value = this.props[metric.key];
              let units = metric.units;
              if(user.units === 'imperial') {
                units = convertUnits(units);
              }
              return (
                <div key={metric.key}
                  className="flex0 flexbox align-items-center"
                  style={{width: '50%'}}
                  title={metric.title}>
                  <i className="material-icons" style={{color: metric.color}}>{metric.icon}</i>
                  { value !== null &&
                    <span>{value} <span className="text-light fs12">{units}</span></span>
                  }
                  { value === null &&
                    <span className="text-light">Missing Data</span>
                  }
                </div>
              );
            })}
            <button
              type="button"
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                openModal(modalTypes.deleteRun, run);
              }}>
              <i className="material-icons">delete</i>
            </button>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  const { run } = ownProps;
  const props = {
    showModal: state.modal.show,
    USER_ID: state.user.id,
    user: state.user,
  };
  metrics.forEach((metric) => {
    if(metric.key === 'distance') {
      props[metric.key] = (run && roundTo(run.checkpoints[run.checkpoints.length - 1].distance, 2)) || 0;
    } else {
      props[metric.key] = getAvgRunData(state, {
        key: metric.key,
        runId: run.id
      });
    }
  });

  return props;
};

class RunBox extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { run,
            checkable,
            history,
            className,
            showModal } = this.props;

    if(checkable) {
      return <RunBoxInner {...this.props}/>;
    } else {
      return (
        <div className={className || ''}
          onClick={() => {
            history.push(`/runs/${run.id}`);
            if(showModal) {
              toggleModal();
            }
          }}>
          <RunBoxInner {...this.props} className=""/>
        </div>
      );
    }
  };
};

export default withRouter(connect(mapStateToProps)(RunBox));