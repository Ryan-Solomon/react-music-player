import React from 'react';

const LibrarySong = ({
  setIsPlaying,
  currentSong,
  setCurrentSong,
  audioElementRef,
  songs,
}) => {
  const updateSong = () => {
    setCurrentSong(currentSong);
    setIsPlaying(true);
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        song.active = true;
      } else {
        song.active = false;
      }
      return song;
    });

    const playPromise = audioElementRef.current.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioElementRef.current.play();
      });
    }
  };

  return (
    <div
      className={`library-song ${currentSong.active ? 'selected' : ''}  `}
      onClick={updateSong}
    >
      <img alt={currentSong.name} src={currentSong.cover} />
      <div className='song-description'>
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
