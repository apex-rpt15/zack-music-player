import React from 'react';
import styles from '../css/SongClock.css';

var TimeBar = ({percent, changePercent}) => {
  var barPx = `${(percent * 2)}px`
  var whitePx = `${(percent * 2 - 2)}px`
  return (
    <div className={styles.hover} onClick={changePercent}>
      <div className={styles.beneathBar}></div>
      <div className={styles.whiteBar} style={{'width': barPx}}></div>
      <div className={styles.songPosition} style={{'marginLeft': whitePx}}></div>
      <div className={styles.topBar} style={{'width': barPx}}></div>
    </div>
  );
};

export default TimeBar;