import React, { useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';
import data from './data';
import Library from './components/Library';

function App() {
  const [songs, setSongs] = useState(() => data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElementRef = useRef();

  const playSongHandler = () => {
    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className='App'>
      <Song currentSong={currentSong} />
      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        playSongHandler={playSongHandler}
        audioElementRef={audioElementRef}
      />
      <Library
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        audioElementRef={audioElementRef}
        songs={songs}
      />
    </div>
  );
}

export default App;
