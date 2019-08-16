import React, { Component } from 'react';
import styles from '../css/PlayerControls.css';
import shuffle from '../images/shuffle.png';
import shuffleOn from '../images/shuffleOn.png';
import loop from '../images/loop.png';
import loopOn from '../images/loopOn.png';
import loop1On from '../images/loop1On.png';

class BottomPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      shuffle: false,
      loop: 0
    };
  }

  clickPlay() {
    this.setState({
      play: !this.state.play
    });
  }

  clickShuffle() {
    this.setState({
      shuffle: !this.state.shuffle
    });
  }

  clickLoop() {
    if (this.state.loop === 2) {
      var loop = 0;
    } else {
      var loop = this.state.loop + 1;
    }
    this.setState({
      loop: loop
    });
  }

  render() {
    var noload = 'javascript:void(0)';
    return (
      <div className={styles.background}>
        <a href={noload}><div className={styles.bLine}></div></a>
        <a href={noload}><div className={styles.back}></div></a>
        <div className={styles.space}></div>
        {
          this.state.play
            ? <div className={styles.pauseBox}>
              <a href={noload} onClick={this.clickPlay.bind(this)}><div className={styles.pauseBar}></div></a>
              <a href={noload} onClick={this.clickPlay.bind(this)}><div className={styles.pauseSpace}></div></a>
              <a href={noload} onClick={this.clickPlay.bind(this)}><div className={styles.pauseBar}></div></a>
            </div>
            : <a href={noload} onClick={this.clickPlay.bind(this)}><div className={styles.play}></div></a>
        }
        <div className={styles.space}></div>
        <a href={noload}><div className={styles.forward}></div></a>
        <a href={noload}><div className={styles.fLine}></div></a>
        <div className={styles.space}></div>
        {
          this.state.shuffle
            ? <a href={noload} onClick={this.clickShuffle.bind(this)}><img src={shuffleOn} alt="Shuffle" className={styles.shuffle}></img></a>
            : <a href={noload} onClick={this.clickShuffle.bind(this)}><img src={shuffle} alt="Shuffle" className={styles.shuffle}></img></a>
        }
        <div className={styles.space}></div>
        {
          this.state.loop
            ? (this.state.loop === 1
              ? <a href={noload} onClick={this.clickLoop.bind(this)}><img src={loop1On} alt="Loop1On" className={styles.loop}></img></a>
              : <a href={noload} onClick={this.clickLoop.bind(this)}><img src={loopOn} alt="LoopOn" className={styles.loop}></img></a>)
            : <a href={noload} onClick={this.clickLoop.bind(this)}><img src={loop} alt="LoopOff" className={styles.loop}></img></a>
        }
      </div>
    );
  }
}

export default BottomPlayer;