import React from 'react';
import styles from '../css/LikedAndNextUp.css';
import heartBlack from '../images/heart-black.png';
import heartOrange from '../images/heart-orange.png';
import nextBlack from '../images/next-black.png';
import nextOrange from '../images/next-orange.png';

var LikedAndNextUp = ({ liked, clickLike, nextUp, clickNextUp }) => (
  <div>
    <a href="javascript:void(0)" onClick={clickLike}>
      {
        liked
          ? <img className={styles.heart} src={`http://localhost:3004/${heartOrange}`} alt="Like"></img>
          : <img className={styles.heart} src={`http://localhost:3004/${heartBlack}`} alt="Like"></img>
      }
    </a>
    <a href="javascript:void(0)" onClick={clickNextUp}>
      {
        nextUp
          ? <img className={styles.nextUp} src={`http://localhost:3004/${nextOrange}`} alt="NextUp"></img>
          : <img className={styles.nextUp} src={`http://localhost:3004/${nextBlack}`} alt="NextUp"></img>
      }
    </a>
  </div>
);

export default LikedAndNextUp;