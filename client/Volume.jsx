import React from 'react';
import styles from '../css/Volume.css';

var show = () => {
  var pop = document.getElementById('pop');
  pop.style.opacity = 1;
};
var hide = () => {
  var pop = document.getElementById('pop');
  pop.style.opacity = 0;
};
var Volume = ({ volumeOn, clickVol }) => {
  return (
    <div>
      <div className={styles.popUp} id="pop">
        <div className={styles.lowTriangle}></div>
        <div className={styles.lineUp}></div>
        <div className={styles.orangeLine}></div>
        <div className={styles.volBall}></div>
      </div>
      <a href="javascript:void(0)" onClick={clickVol} className={styles.speaker} onMouseOver={show} onMouseLeave={hide}>
        <div className={styles.square}></div>
        <div className={styles.triangle}></div>
        {
          volumeOn
            ? <div><div className={styles.outerCircle}></div>
              <div className={styles.innerCircle}></div></div>
            : <div><div className={styles.xL}></div>
              <div className={styles.xR}></div></div>
        }

      </a>
    </div>
  );
}

export default Volume;