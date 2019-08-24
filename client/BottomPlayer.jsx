import React, { Component } from 'react';
import SongClock from './SongClock.jsx'
import Volume from './Volume.jsx'
import styles from '../css/BottomPlayer.css';
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
      loop: 0,
      volumeOn: true,
      currentTime: '0:00',
      endTime: '5:00',
      percentage: 20
    };
  }

  clickPlay() {
    this.setState({
      play: !this.state.play
    });
  }

  changePercent(e) {
    var pointX = e.pageX;
    console.log(pointX);
    var eLeft = e.target.offsetLeft;
    console.log('eLeft:', eLeft);
  }

  calculatePlayBar() {
    var minCur = this.state.currentTime.slice(0, 1);
    var secCur = this.state.currentTime.slice(2, 4);
    var minEnd = this.state.endTime.slice(0, 1);
    var secEnd = this.state.endTime.slice(2, 4);
    var totalSecCur = Number(minCur) * 60 + Number(secCur);
    var totalSecEnd = Number(minEnd) * 60 + Number(secEnd);
    var decimal = JSON.stringify(totalSecCur / totalSecEnd);
    if (decimal.length > 4) {
      var percent = decimal.slice(2, 3) + decimal.slice(3, 4) + '.' + decimal.slice(4, 5);
    } else if (decimal.length > 3) {
      var percent = decimal.slice(2, 3) + decimal.slice(3, 4);
    } else if (decimal.length > 2) {
      var percent = decimal.slice(2, 3) + '0';
    } else {
      var percent = decimal.slice(0, 1);
    }
    this.setState({
      percentage: Number(percent)
    });
  }

  clickShuffle() {
    this.setState({
      shuffle: !this.state.shuffle
    });
  }

  clickVol() {
    this.setState({
      volumeOn: !this.state.volumeOn
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
      <div className={styles.zIndex}>
      {/* <div style={{'height':'200px'}}></div> temporary placeholder for upper elements */}
      <div className={styles.background}></div>
      <div className={styles.flex}>
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
          // ? <a href={noload} onClick={this.clickShuffle.bind(this)}><img src={shuffleOn} alt="Shuffle" className={styles.shuffle}></img></a>
          // ? <a href={noload} onClick={this.clickShuffle.bind(this)}><img src={`${process.env.URL}/${shuffleOn}`} alt="ShuffleOn" className={styles.shuffle}></img></a>
          ? <a href={noload} onClick={this.clickShuffle.bind(this)}><img src={`http://localhost:3004/${shuffleOn}`} alt="ShuffleOn" className={styles.shuffle}></img></a>
          : <a href={noload} onClick={this.clickShuffle.bind(this)}><img src={`http://localhost:3004/${shuffle}`} alt="ShuffleOff" className={styles.shuffle}></img></a>
        }
        <div className={styles.space}></div>
        {
          this.state.loop
          ? (this.state.loop === 1
            ? <a href={noload} onClick={this.clickLoop.bind(this)}><img src={`http://localhost:3004/${loop1On}`} alt="Loop1On" className={styles.loop}></img></a>
            : <a href={noload} onClick={this.clickLoop.bind(this)}><img src={`http://localhost:3004/${loopOn}`} alt="LoopOn" className={styles.loop}></img></a>)
            : <a href={noload} onClick={this.clickLoop.bind(this)}><img src={`http://localhost:3004/${loop}`} alt="LoopOff" className={styles.loop}></img></a>
          }
        <div className={styles.space}></div>
        <div className={styles.space}></div>
        <SongClock currentTime={this.state.currentTime} endTime={this.state.endTime} percent={this.state.percentage} changePercent={this.changePercent.bind(this)} />
        <div className={styles.space}></div>
        <div className={styles.space}></div>
        <Volume volumeOn={this.state.volumeOn} clickVol={this.clickVol.bind(this)} />
      </div>
      </div>
    );
  }
}

export default BottomPlayer;