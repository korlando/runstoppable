import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div className={`modal-wrapper${show ? ' show' : ''}`}>
        <div className={'modal-background'}>
        </div>
        <div className={'modal'}>
        </div>
      </div>
    );
  };
};