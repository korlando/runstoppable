import React from 'react';

export default (props) => {
  return (
    <div>
      <div className="flexbox align-items-baseline"
        style={{ lineHeight: '1' }}>
        <div style={{
          fontSize: '40px',
          marginRight: '3px',
          fontWeight: '300'
        }}>{props.hours}</div>
        <div className="text-light" style={{
          fontSize: '18px',
          marginRight: '6px'
        }}>h</div>
        <div style={{
          fontSize: '40px',
          marginRight: '3px',
          fontWeight: '300'
        }}>{props.minutes}</div>
        <div className="text-light" style={{
          fontSize: '18px',
          marginRight: '6px'
        }}>m</div>
      </div>
    </div>
  );
};