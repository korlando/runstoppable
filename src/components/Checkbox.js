import React, { Component } from 'react';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleClick = this.handleClick.bind(this);
  };

  componentWillReceiveProps(nextProps) {
    const { checked } = nextProps;
    if(checked !== undefined) {
      this.setState({ checked });
    }
  };

  value(val) {
    if(val !== undefined) {
      this.setState({ checked: val });
    }
    return this.state.checked;
  };

  toggle() {
    const checked = !this.state.checked;
    this.setState({ checked });
    return checked;
  };
  
  handleClick(e) {
    e.stopPropagation();
    const checked = !this.state.checked;
    if(this.props.checked === undefined) {
      this.setState({ checked });
    }

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