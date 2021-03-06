import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleModal } from '../../util'
import CompareModal from './CompareModal';
import SettingsModal from './SettingsModal';
import UploadModal from './UploadModal';
import DeleteRunModal from './DeleteRunModal';
import DeleteAccountModal from './DeleteAccountModal';
import ShoesModal from './ShoesModal';
import modalTypes from '../../constants/modalTypes';

const mapStateToProps = (state) => {
  return {
    show: state.modal.show,
    type: state.modal.type,
  };
};

const getModalFromType = (type) => {
  switch(type) {
    case modalTypes.compare:
      return <CompareModal/>;
    case modalTypes.settings:
      return <SettingsModal/>;
    case modalTypes.upload:
      return <UploadModal/>;
    case modalTypes.deleteRun:
      return <DeleteRunModal/>;
    case modalTypes.deleteAccount:
      return <DeleteAccountModal/>;
    case modalTypes.shoes:
      return <ShoesModal/>;
  }
};

@connect(mapStateToProps)
export default class ModalWrapper extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { show, type } = this.props;
    
    return (
      <div className={`modal-wrapper flexbox align-items-center justify-content-center${show ? ' show' : ''}`}
        onClick={toggleModal}>
        { getModalFromType(type) }
      </div>
    );
  };
};