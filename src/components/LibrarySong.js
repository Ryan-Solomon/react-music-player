import React from 'react';

const LibrarySong = ({
  setIsPlaying,
  currentSong,
  setCurrentSong,
  audioElementRef,
  songs,
  setSongs,
}) => {
  const updateSong = () => {
    setCurrentSong(currentSong);
    setIsPlaying(true);
    const newSongs = songs.map((song) => {
      let isCurrent;
      if (song.id === currentSong.id) {
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
