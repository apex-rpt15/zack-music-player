import React from 'react';
import styles from '../css/SongInfo.css';

var SongInfo = ({ art, artist, name }) => (
  <>
    <img className={styles.art} src={art} alt="SongArt"></img>
    <div>
      <p className={styles.artist}>{artist}</p>
      <div className={styles.flex}><p className={styles.song}>{name}</p></div>
    </div>
  </>
);

export default SongInfo;