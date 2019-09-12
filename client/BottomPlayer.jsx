import React, { Component } from 'react';
import SongClock from './SongClock.jsx'
import SongInfo from './SongInfo.jsx'
import Volume from './Volume.jsx'
import LikedAndNextUp from './LikedAndNextUp.jsx'
import styles from '../css/BottomPlayer.css';
import shuffle from '../images/shuffle.png';
import shuffleOn from '../images/shuffleOn.png';
import loop from '../images/loop.png';
import loopOn from '../images/loopOn.png';
import loop1On from '../images/loop1On.png';
import $ from 'jquery';

class BottomPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      shuffle: false,
      fwd: false,
      loop: 0,
      volumeOn: true,
      currentTime: '0:00',
      endTime: '0:00',
      percentage: 0,
      songArt: 'http://thesingingwalrus.com/wp-content/uploads/2015/11/Good-morning-square-thumb.jpg',
      songName: 'Little Bugs (with some extra text to test overflow)',
      songArtist: 'AmigoKing',
      liked: false,
      nextUp: false,
      song: new Audio('https://www.bensound.org/bensound-music/bensound-summer.mp3')
      // song: new Audio('https://apex15-fec-cdn.s3.us-east-2.amazonaws.com/Little+Bugs.mp3')
    };
  }

  calculateClock(duration) {
    var clock = '0:00';
    while (duration >= 60) {
      var min = clock.slice(0, 1);
      min = Number(min) + 1;
      clock = min + clock.slice(1);
      duration -= 60;
    }
    if (duration > 0) {
      var min = clock.slice(0, 1);
      var sec = Math.round(duration);
      if (sec < 10) { sec = '0' + sec; }
      clock = min + ':' + sec;
    }
    return clock;
  }

  componentDidMount() {
    $.get({
      // url: 'http://localhost:3001/tracks/AmigoKing/Little%20Bugs',
      url: 'http://ec2-3-14-130-218.us-east-2.compute.amazonaws.com/tracks/AmigoKing/Little%20Bugs',
      success: (result) => {
        this.setState({
          songArt: result.art_url,
          songName: result.name,
          songArtist: result.artist
        });
      }
    });
    // setting the inital value for the song length = (this.state.endTime)
    setTimeout(() => {
      var duration = this.state.song.duration;
      var clock = this.calculateClock(duration);
      this.setState({
        endTime: clock
      });
    }, 100); // delayed 100ms so that the browser has time to load the song
  }

  clickPlay() {
    if (this.state.play) {
      this.state.song.pause();
    } else {
      this.state.song.play();
      var clock = setInterval(() => {
        var current = this.calculateClock(this.state.song.currentTime)
        this.calculatePlayBar();
        if (this.state.song.ended) {
          current = this.state.endTime
        }
        this.setState({
          currentTime: current
        });
        if (this.state.currentTime === this.state.endTime && !this.state.loop) {
          this.setState({
            play: false
          });
        }
        if (this.state.currentTime === this.state.endTime || !this.state.play) {
          clearInterval(clock);
          if (this.state.fwd) { // if I've clicked track FWD - ensure that orange bar is 100% filled
            this.setState({
              percentage: 100
            });
          }
        }
      }, 250);
    }
    this.setState({
      play: !this.state.play,
      fwd: false
    });
  }

  clickLike() {
    this.setState({
      liked: !this.state.liked
    });
  }

  clickNextUp() {
    this.setState({
      nextUp: !this.state.nextUp
    });
  }

  changePercent(e) {
    // console.log(e.target.value, e.pageX, e.target.getBoundingClientRect(), e.target.getBoundingClientRect().width)
    var duration = this.state.song.duration;
    var sec = e.target.value * duration / 100;
    var current = this.calculateClock(sec);

    this.state.song.currentTime = sec;
    this.setState({
      currentTime: current,
      percentage: e.target.value
    });
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
    if (this.state.volumeOn) {
      this.state.song.volume = '0.0';
    } else {
      this.state.song.volume = '1.0';
    }
    this.setState({
      volumeOn: !this.state.volumeOn
    });
  }

  clickLoop() {
    if (this.state.loop === 2) {
      var loop = 0;
      this.state.song.loop = false;
    } else {
      var loop = this.state.loop + 1;
      this.state.song.loop = true;
    }
    this.setState({
      loop: loop
    });
  }

  clickRWD() {
    this.state.song.currentTime = 0;
    this.setState({
      currentTime: '0:00',
      percentage: 0
    });
  }
  clickFWD() {
    this.state.song.currentTime = this.state.song.duration;
    this.setState({
      fwd: true,
      currentTime: this.state.endTime,
      percentage: 100
    });
  }

  render() {
    var noload = 'javascript:void(0)';
    return (
      <div className={styles.zIndex}>
        {/* <div style={{ 'height': '200px' }}></div> temporary placeholder for upper elements */}
        <div className={styles.background}></div>
        <div className={styles.flex}>
          <div style={{ width: "137px" }}></div> {/* LEFT SPACER element */}
          <a href={noload} onClick={this.clickRWD.bind(this)}><div className={styles.bLine}></div></a>
          <a href={noload} onClick={this.clickRWD.bind(this)}><div className={styles.back}></div></a>
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
          <a href={noload} onClick={this.clickFWD.bind(this)}><div className={styles.forward}></div></a>
          <a href={noload} onClick={this.clickFWD.bind(this)}><div className={styles.fLine}></div></a>
          <div className={styles.space}></div>
          {
            this.state.shuffle
              ? <a href={noload} onClick={this.clickShuffle.bind(this)}><img src={`${process.env.URL}/${shuffleOn}`} alt="ShuffleOn" className={styles.shuffle}></img></a>
              : <a href={noload} onClick={this.clickShuffle.bind(this)}><img src={`${process.env.URL}/${shuffle}`} alt="ShuffleOff" className={styles.shuffle}></img></a>
          }
          <div className={styles.space}></div>
          {
            this.state.loop
              ? (this.state.loop === 1
                ? <a href={noload} onClick={this.clickLoop.bind(this)}><img src={`${process.env.URL}/${loop1On}`} alt="Loop1On" className={styles.loop}></img></a>
                : <a href={noload} onClick={this.clickLoop.bind(this)}><img src={`${process.env.URL}/${loopOn}`} alt="LoopOn" className={styles.loop}></img></a>)
              : <a href={noload} onClick={this.clickLoop.bind(this)}><img src={`${process.env.URL}/${loop}`} alt="LoopOff" className={styles.loop}></img></a>
          }
          <div className={styles.space}></div>
          <div className={styles.space}></div>
          <SongClock currentTime={this.state.currentTime} endTime={this.state.endTime} percent={this.state.percentage} changePercent={this.changePercent.bind(this)} />
          <div className={styles.space}></div>
          <div className={styles.space}></div>
          <Volume volumeOn={this.state.volumeOn} clickVol={this.clickVol.bind(this)} />
          <div className={styles.space}></div>
          <SongInfo art={this.state.songArt} artist={this.state.songArtist} name={this.state.songName} />
          <div style={{ width: "5px" }}></div>
          <LikedAndNextUp liked={this.state.liked} clickLike={this.clickLike.bind(this)} nextUp={this.state.nextUp} clickNextUp={this.clickNextUp.bind(this)} />
        </div>
      </div>
    );
  }
}

export default BottomPlayer;