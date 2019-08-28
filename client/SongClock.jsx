import React from 'react';
import styles from '../css/SongClock.css';
import TimeBar from './TimeBar.jsx';

var SongClock = ({ currentTime, endTime, percent, changePercent }) => (
  <div className={styles.flex}>
    <p className={styles.orange}>{currentTime}</p>
    <div className={styles.spaceSmall}></div>
    <TimeBar percent={percent} changePercent={changePercent} />
    <div className={styles.spaceSmall}></div>
    <p className={styles.endTime}>{endTime}</p>
  </div>
);

export default SongClock;