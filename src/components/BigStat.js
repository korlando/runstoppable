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
        <div className="text-light" style={{
          fontSize: '18px'
        }}>{props.units}</div>
      </div>
    </div>
  );
};