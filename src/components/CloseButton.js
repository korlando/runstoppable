import React from 'react';

export default (props) => {
  return (
    <button
      className={`menu-icon ${props.className || ''}`}
      onClick={props.onClick}>
      <svg className="line">
        <line x1="2" x2="18" y1="2" y2="2"/>
      </svg>
      <svg className="line">
        <line x1="2" x2="18" y1="2" y2="2"/>
      </svg>
      <svg className="line">
        <line x1="2" x2="18" y1="2" y2="2"/>
      </svg>
    </button>
  );
};