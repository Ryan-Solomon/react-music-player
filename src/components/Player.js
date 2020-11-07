import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong }) => {
  const audioElementRef = useRef();

  const playSongHandler = () => {
    if (isAudioPlaying()) {
      audioElementRef.current.pause();
    } else {
      audioElementRef.current.play();
    }
  };

  const isAudioPlaying = () => {
    return !audioElementRef.current.paused;
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>Start Time</p>
        <input type='range' />
        <p>End Time</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={faPlay}
        />
        <FontAwesomeIcon
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
        />
      </div>
      <audio ref={audioElementRef} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
