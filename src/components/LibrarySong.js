import React from 'react';

const LibrarySong = ({
  setIsPlaying,
  currentSong,
  setCurrentSong,
  audioElementRef,
}) => {
  const updateSong = () => {
    setCurrentSong(currentSong);
    setIsPlaying(true);

    const playPromise = audioElementRef.current.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioElementRef.current.play();
      });
    }
  };

  return (
    <div className='library-song' onClick={updateSong}>
      <img alt={currentSong.name} src={currentSong.cover} />
      <div className='song-description'>
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
