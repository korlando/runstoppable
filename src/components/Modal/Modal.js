import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  };
};

@connect(mapStateToProps)
export default class Modal extends Component {
  constructor(props) {
    super(props);
  };

  render() {

    return (
      <div className={'modal-custom'}>
      
      </div>
    );
  };
};