import React, { useState } from 'react';
import musicData from './HomeData.json';
import './Home.css';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

const Home = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSongClick = (trackId) => {
    const clickedTrack = musicData.find((track) => track.id === trackId);
    setSelectedTrack(clickedTrack);

    // Update Recently Played in Session Storage
    const recent = JSON.parse(sessionStorage.getItem('recentlyPlayed')) || [];
    const updatedRecent = [clickedTrack, ...recent.filter(item => item.id !== clickedTrack.id)].slice(0, 10);
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecent));
  };

  const getFilteredTracks = () => {
    let tracks = [...musicData];

    if (filter === 'favourites') {
      const favs = JSON.parse(localStorage.getItem('favourites')) || [];
      return favs;
    }

    if (filter === 'recent') {
      return JSON.parse(sessionStorage.getItem('recentlyPlayed')) || [];
    }

    if (filter === 'top') {
      return tracks.slice(0, 5);
    }

    return tracks.filter((track) =>
      track.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleFavourite = (e, track) => {
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    const updatedFavs = favs.find(t => t.id === track.id)
      ? favs.filter(t => t.id !== track.id)
      : [...favs, track];
    localStorage.setItem('favourites', JSON.stringify(updatedFavs));
  };

  return (
    <div className="home-wrapper">
      <Sidebar setFilter={setFilter} activeFilter={filter} />

      <div className="home-container">
        <h2 className="home-title">For You</h2>

        <input
          type="search"
          placeholder="Search Song, Artist"
          className="home-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="track-list">
          {getFilteredTracks().map((track) => (
            <div
              key={track.id}
              onClick={() => handleSongClick(track.id)}
              className={`track-card`}
            >
              <div className="track-left">
                <img
                  src={track.thumbnail || 'https://via.placeholder.com/100'}
                  alt={track.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100';
                  }}
                  className="track-thumbnail"
                />
                <div className="track-info">
                  <div className="track-info-1">
                    <div className="track-title">{track.title}</div>
                    <div className="track-artist">{track.artistName}</div>
                  </div>
                  <div className="track-duration">{track.duration || '0:00'}</div>
                </div>

                <div className="track-options">
                  <button
                    className="track-dots"
                    onClick={(e) => toggleFavourite(e, track)}
                  >
                    ⋮
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

  
      {selectedTrack && (
  <div className="main-popup">
    <Main key={selectedTrack.id} track={selectedTrack} />
  </div>
)}

    </div>
  );
};

export default Home;




