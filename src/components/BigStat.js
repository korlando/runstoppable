import React from 'react';

export default (props) => {
  const { className, stat, units } = props;
  return (
    <div className={`big-stat ${className || ''}`}>
      <div className="flexbox align-items-baseline flex-wrap"
        style={{ lineHeight: '1' }}>
        <div className="fw300 mr5" style={{
          fontSize: '40px',
        }}>{stat}</div>
        <div className="text-light" style={{
          fontSize: '18px'
        }}>{units}</div>
      </div>
    </div>
  );
};