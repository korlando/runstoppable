import React, { Component } from 'react';
import { connect } from 'react-redux';

import { renderRunPath,
         updateRunName,
         toggleModal } from '../util';
import modalTypes from '../constants/modalTypes';

import PaceChart from './Charts/PaceChart';
import HeartRateChart from './Charts/HeartRateChart';
import DistanceChart from './Charts/DistanceChart';
import ElevationChart from './Charts/ElevationChart';
import EditRunName from './EditRunName';

const mapStateToProps = (state, props) => {
  const runId = (props.match && props.match.params.runId) || props.runId;
  
  return {
    run: state.run.runMap[runId],
    USER_ID: state.user.id,
  };
};

@connect(mapStateToProps)
export default class SingleRunPage extends Component {
  constructor(props) {
    super(props);

    this.state = { editingName: false };
    this.saveName = this.saveName.bind(this);
  };

  componentDidMount() {
    if(this.props.run && this.map) {
      renderRunPath(
        this.map,
        [this.props.run],
        true, true, true,
        this.resetButton
      );
    }
  };

  componentDidUpdate(prevProps) {
    if(prevProps.run !== this.props.run && this.map) {
      renderRunPath(
        this.map,
        [this.props.run],
        true, true, true,
        this.resetButton
      );
    }
  };

  saveName(name) {
    const { run, USER_ID } = this.props;
    const callback = () => {
      this.setState({ editingName: false });
    };
    updateRunName(name, run, USER_ID, callback);
  };

  render() {
    const { run, avgPace, avgHeartRate, noContainer } = this.props;
    const { editingName } = this.state;
    if(!run) return null;

    return (
      <div className={noContainer ? '' : 'page-container'}>
        { !editingName &&
          <div className="flexbox edit-container">
            <h1 className="flex0"
              style={{fontSize: '36px'}}>{run.name}</h1>
            <button type="button"
              className="flex0 edit-btn"
              onClick={() => this.setState({ editingName: true })}>
              <i className="material-icons">mode_edit</i>
            </button>
          </div>
        }
        { editingName &&
          <div style={{paddingBottom: '19px'}}>
            <EditRunName
              run={run}
              onSave={this.saveName}
              onCancel={() => this.setState({ editingName: false })}/>
          </div>
        }
        <div className="flexbox align-items-baseline">
          <h2 className="fw300"
            style={{marginRight: '10px', fontSize: '24px'}}>
            {run.location}
          </h2>
          <h3 className="fw300 text-light"
            style={{fontSize: '20px'}}>
            {run.startFormatted}
          </h3>
        </div>

        <div className="row mb16">
          <div className="col-12">
            <button
              ref={node => this.resetButton = node}
              className="btn btn-default map-reset">
              Reset View
            </button>
            <div className="rs-border br3"
              style={{ height: '250px' }}
              ref={node => this.map = node}></div>
          </div>
        </div>
          
        <div className="row mb16">
          <div className="col-sm-6 pr8">
            <div className="chart-container">
              <PaceChart runIds={[run.id]}/>
            </div>
          </div>
          <div className="col-sm-6 pl8">
            <div className="chart-container">
              <HeartRateChart runIds={[run.id]}/>
            </div>
          </div>
        </div>
        
        <div className="row mb16">
          <div className="col-sm-6 pr8">
            <div className="chart-container">
              <ElevationChart runIds={[run.id]}/>
            </div>
          </div>
          <div className="col-sm-6 pl8">
            <div className="chart-container">
              <DistanceChart runIds={[run.id]}/>
            </div>
          </div>     
        </div> 

        <div className="flexbox">
          <div className="flex1"></div>
          <button type="button"
            className="flex0 btn btn-danger"
            onClick={() => toggleModal(modalTypes.deleteRun, run)}>
            Delete Run
          </button>
        </div>
      </div>
    );
  };
};