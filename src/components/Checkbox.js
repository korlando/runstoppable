import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    checked: state.checked
  };
};

@connect(mapStateToProps)
export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    this.handleClick = this.handleClick.bind(this);
  };
  
  handleClick() {
    this.setState(prevState => ({
      checked: !prevState.checked
    }));
  }

  render() {
    const { checked } = this.state;

    return (
      <div className={`checkbox${checked ? ' checked' : ''}`} onClick={this.handleClick}>
      </div>
    );
  };
};