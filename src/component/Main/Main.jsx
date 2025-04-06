import React, { useState, useEffect } from 'react';
import './Main.css';

const Main = ({ track }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setIsFav(favs.some((t) => t.id === track.id));
  }, [track]);

  const toggleFavourite = () => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    let updatedFavs;
    if (isFav) {
      updatedFavs = favs.filter((t) => t.id !== track.id);
    } else {
      updatedFavs = [...favs, track];
    }
    localStorage.setItem('favourites', JSON.stringify(updatedFavs));
    setIsFav(!isFav);
  };

  if (!track) return null;

  return (
    <div className="main-wrapper">
      {/* Title and artist at top always */}
      <div className="main-header-text">
        <h2 className="main-title">{track.title}</h2>
        <p className="main-artist">Artist: {track.artistName}</p>
      </div>

      <div
        className="main-container"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #000), url(${track.thumbnail}) no-repeat center/cover`,
        }}
      >
        <img
          src={track.thumbnail || 'https://via.placeholder.com/150'}
          alt={track.title}
          className="main-thumbnail"
        />

        <div className="main-details">
          <p className="main-singer">Singer: {track.singerName}</p>
          <audio controls className="main-audio" autoPlay>
            <source src={track.musicUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <button className="main-heart" onClick={toggleFavourite}>
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;








