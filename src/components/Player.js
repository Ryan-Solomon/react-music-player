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
  setSongs,
}) => {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
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

    const newSongs = songs.map((song, idx) => {
      let isCurrent;
      if (idx === nextSongIdx) {
        isCurrent = true;
      } else {
        isCurrent = false;
      }
      return { ...song, active: isCurrent };
    });

    setSongs(newSongs);

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
    const roundedCurrentTime = Math.round(currentTime);
    const roundedCurrentDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrentTime / roundedCurrentDuration) * 100
    );

    setSongInfo({
      currentTime,
      duration,
      animationPercentage,
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

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className='track'
        >
          <input
            min={0}
            onChange={dragHandler}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type='range'
          />
          <div style={trackAnim} className='animate-track'></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
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
