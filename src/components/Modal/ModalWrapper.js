import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import Modal from './Modal';

const mapStateToProps = (state) => {
  return {
    show: state.modal.show
  };
};

@connect(mapStateToProps)
export default class ModalWrapper extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { show } = this.props;
    
    return (
      <div className={`modal-wrapper flexbox align-items-center justify-content-center${show ? ' show' : ''}`} onClick={toggleModal}>
        <Modal/>
      </div>
    );
  };
};