import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import Modal from './Modal';
import modalTypes from '../../constants/modalTypes';

const mapStateToProps = (state) => {
  return {
    show: state.modal.show,
    type: state.modal.type
  };
};

@connect(mapStateToProps)
export default class ModalWrapper extends Component {
  constructor(props) {
    super(props);
  };
  
  getModalFromType(type) {
    switch (type){
        case modalTypes.compare:
          return <Modal/>
        case modalTypes.settings:
          return <SettingsModal/>
      }
  }

  render() {
    const { show, type } = this.props;
    
    return (
      <div className={`modal-wrapper flexbox align-items-center justify-content-center${show ? ' show' : ''}`} onClick={toggleModal}>
        { this.getModalFromType(type) }
      </div>
    );
  };
};