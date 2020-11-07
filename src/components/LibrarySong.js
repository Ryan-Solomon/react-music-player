import React from 'react';

const LibrarySong = ({ songs, currentSong, setCurrentSong, index }) => {
  return (
    <div className='library-song' onClick={() => setCurrentSong(currentSong)}>
      <img alt={currentSong.name} src={currentSong.cover} />
      <div className='song-description'>
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
