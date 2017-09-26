import React from 'react';
import BigStat from '../BigStat';
import { isBadStat } from '../../util';

export default (props) => {
  const { icon, color, title, statLabel, stat, units } = props;
  const invalidStat = isBadStat(stat);
  
  return (
    <div className="chart-header flexbox align-items-center"
      style={{ paddingBottom: '5px' }}>
      <h3 className="flex1 flexbox align-items-center m0"
        style={{ color }}>
        <i className="material-icons header-icon">{icon}</i>
        <span>{title}</span>
      </h3>
      <div className="flex0 relative">
        { !invalidStat &&
          <div className="big-stat-label">{statLabel}</div>
        }
        { invalidStat ?
          <BigStat stat="Missing Data"/> : 
          <BigStat stat={stat} units={units}/>
        }
      </div>
    </div>
  );
};