import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dropzone from 'react-dropzone';

import { dispatchAddBulkRuns,
         parseRun,
         toggleModal } from '../../util';
import RunBox from '../RunBox';

const mapStateToProps = (state) => {
  return {
    runIndex: state.run.index,
    runMap: state.run.runMap,
  };
};

const dataOptions = [{
  value: 'garmin',
  name: 'Garmin'
}];

class UploadModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataType: 'garmin',
      uploadedRunIds: [],
    };
    this.handleDrop = this.handleDrop.bind(this);
  };

  handleDrop(files) {
    if(!files || !files[0]) {
      return;
    }
    // http://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it
    const fr = new FileReader();
    fr.readAsText(files[0]);
    fr.onload = (e) => {
      try {
        const run = JSON.parse(e.target.result);
        const parsedRun = parseRun(run);
        const { runIndex } = this.props;
        dispatchAddBulkRuns([parsedRun]);
        this.setState({
          uploadedRunIds: [...this.state.uploadedRunIds, runIndex]
        });
      } catch(e) {

      }
    };
  };

  render() {
    const { runMap } = this.props;
    const { dataType,
            uploadedRunIds } = this.state;

    return (
      <div className="modal-custom upload-modal"
        onClick={e => e.stopPropagation()}>
        <h2>Upload Run Data</h2>
        <div>
          <div>Choose a device:</div>
          <select
            className="form-control"
            value={dataType}
            onChange={e => this.setState({ dataType: e.target.value })}>
            { dataOptions.map((o) => {
              return <option value={o.value} key={o.value}>{o.name}</option>;
            })}
          </select>
        </div>

        <Dropzone
          accept="application/json"
          onDrop={this.handleDrop}
          style={{}}>
          {({ isDragActive, isDragReject }) => {
            return (
              <div className={`upload-dropzone flexbox align-items-center justify-content-center
                ${isDragActive ? ' active-drag' : ''}
                ${isDragReject ? ' reject-drag' : ''}
                ${uploadedRunIds.length > 0 ? ' shorter' : ''}`}>
                <div className="text-center">
                  <i className="material-icons upload-icon">file_upload</i>
                  <div>Drop run data here</div>
                  <div className="text-light">or click to choose a file</div>
                </div>
              </div>
            );
          }}
        </Dropzone>
        { uploadedRunIds.length > 0 &&
          <div className="uploaded-runs">
            <label>Uploaded Runs:</label>
            {uploadedRunIds.map((runId, i) => {
              return (
                <div onClick={toggleModal} key={runId}>
                  <RunBox run={runMap[runId]}/>
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  };
};

export default withRouter(connect(mapStateToProps)(UploadModal));