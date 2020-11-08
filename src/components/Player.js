import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  audioElementRef,
  playSongHandler,
  currentSong,
  isPlaying,
  songs,
  setIsPlaying,
  setCurrentSong,
}) => {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const skip = (forwardOrBack) => {
    let currentSongIdx;
    songs.forEach((song, idx) => {
      if (song.id === currentSong.id) {
        currentSongIdx = idx;
      }
    });

    let nextSongIdx;
    if (forwardOrBack === 'forward') {
      nextSongIdx = currentSongIdx + 1;
      if (nextSongIdx === songs.length) {
        nextSongIdx = 0;
      }
    } else if (forwardOrBack === 'backward') {
      nextSongIdx = currentSongIdx - 1;
      if (nextSongIdx === -1) {
        nextSongIdx = songs.length - 1;
      }
    }
    console.log(nextSongIdx);
    setCurrentSong(songs[nextSongIdx]);
    setIsPlaying(true);
    const playPromise = audioElementRef.current.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioElementRef.current.play();
      });
    }
  };

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      currentTime,
      duration,
    });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioElementRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          onChange={dragHandler}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          type='range'
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          onClick={() => skip('backward')}
          className='skip-back'
          size='2x'
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skip('forward')}
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
        />
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={(e) => timeUpdateHandler(e)}
        ref={audioElementRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
