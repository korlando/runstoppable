import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import { Link } from 'react-router-dom';
import CloseButton from '../CloseButton';

const mapStateToProps = (state) => {
  return {
    data: state.modal.data
  };
};

@connect(mapStateToProps)
export default class ShoesModal extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="modal-custom"
        onClick={e => e.stopPropagation()}>
        <div className="modal-top"
          style={{borderBottom: '0px'}}>
          <div className="flexbox align-items-center">
          </div>
        </div>
      </div>
    );
  };
};