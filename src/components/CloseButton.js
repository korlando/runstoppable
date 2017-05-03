import React, { Component } from 'react';

export default class PaceChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { onClick, className } = this.props;
    
    return (
      <button
        className={`menu-icon ${className || ''}`}
        onClick={onClick}
        ref={node => this.closeButton = node}
        onMouseDown={() => {
          setTimeout(() => {this.closeButton.blur()}, 1);
        }}>
        <svg className="line">
          <line x1="2" x2="22" y1="2" y2="2"/>
        </svg>
        <svg className="line">
          <line x1="2" x2="22" y1="2" y2="2"/>
        </svg>
        <svg className="line">
          <line x1="2" x2="22" y1="2" y2="2"/>
        </svg>
      </button>
    );
  }
};