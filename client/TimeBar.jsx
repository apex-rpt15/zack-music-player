import React from 'react';
import styles from '../css/SongClock.css';

var TimeBar = ({ percent, changePercent }) => {
  var orangeBarPx = `${(percent * 1.75)}px`;

  return (
    <div className={styles.hover}>
      <input type="range" min="0" max="100" value={percent} className={styles.range} onChange={changePercent}></input>
      <div className={styles.orangeBar} style={{ 'width': orangeBarPx }}></div>
      {/* <a href="javascript:void(0)"></a> */}
    </div>
  );
};

export default TimeBar;