import React, { Component } from 'react';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.handleClick = this.handleClick.bind(this);
  };
  
  handleClick() {
    const checked = !this.state.checked;
    this.setState({ checked });

    const { onCheckChange } = this.props;
    if(onCheckChange) {
      onCheckChange(checked);
    }
  };

  render() {
    const { checked } = this.state;

    return (
      <div className={`checkbox${checked ? ' checked' : ''}`}
        onClick={this.handleClick}>
        <i className="material-icons check">check</i>
      </div>
    );
  };
};