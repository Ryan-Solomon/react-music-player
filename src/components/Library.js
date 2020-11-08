import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({
  setIsPlaying,
  songs,
  setCurrentSong,
  audioElementRef,
  setSongs,
}) => {
  return (
    <div className='library'>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => {
          return (
            <LibrarySong
              setCurrentSong={setCurrentSong}
              key={song.name}
              currentSong={song}
              songs={songs}
              setIsPlaying={setIsPlaying}
              audioElementRef={audioElementRef}
              setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
