import React from 'react';

export default (props) => {
  return (
    <div>
      <div className="flexbox align-items-baseline"
        style={{ lineHeight: '1' }}>
        <div style={{
          fontSize: '40px',
          marginRight: '5px'
        }}>{props.stat}</div>
        <div style={{
          fontSize: '18px',
          color: '#747e95'
        }}>{props.units}</div>
      </div>
      <label>{props.label}</label>
    </div>
  );
};