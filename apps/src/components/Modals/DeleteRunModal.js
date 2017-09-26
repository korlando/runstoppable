import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { toggleModal,
         fetchDB,
         updateDB,
         findUserById,
         dispatchDeleteRun } from '../../util';
import RunBox from '../RunBox';

const mapStateToProps = (state) => {
  return {
    data: state.modal.data,
    USER_ID: state.user.id,
  };
};

class DeleteRunModal extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  };

  delete(run) {
    const { USER_ID, history, location } = this.props;
    const rid = run.id;
    fetchDB().then((db) => {
      if(db) {
        const user = findUserById(db, USER_ID);
        if(user) {
          user.runs = user.runs.filter(r => r.id !== rid);
          updateDB(db).then(() => {
            if(location.pathname.match(`/runs/${rid}`)) {
              history.push('/runs');
            }
            dispatchDeleteRun(rid);
            toggleModal();
          }).catch((err) => {

          });
        }
      }
    }).catch((err) => {

    });
  };

  render() {
    const { data } = this.props;

    return (
      <div className="modal-custom flexbox flex-column"
        onClick={e => e.stopPropagation()}>
        <div className="flex1">
          <h2>Delete this run?</h2>
          { data &&
            <RunBox run={data} className="pointer-events-none op5"/>
          }
        </div>
        <div className="flexbox flex0">
          <button type="button"
            className="flex1 btn btn-danger mr5"
            onClick={() => this.delete(data)}>Delete</button>
          <button type="button"
            className="flex1 btn btn-secondary ml5"
            onClick={() => toggleModal()}>Cancel</button>
        </div>
      </div>
    );
  };
};

export default withRouter(connect(mapStateToProps)(DeleteRunModal));