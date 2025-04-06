import React, { useState } from 'react';
import './Sidebar.css';
import { assest } from '../../assets/assest';

const Sidebar = ({ setFilter, activeFilter }) => {
  const [isOpen, setIsOpen] = useState(true);

  const togglebtn = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="icon-1" onClick={togglebtn}>
        <img src={assest.logo} alt="Logo" />
      </div>

      {isOpen && (
        <ul className="sidebar-list">
          <li
            onClick={() => setFilter('all')}
            className={activeFilter === 'all' ? 'active' : ''}
          >
            <strong>For You</strong>
          </li>
          <li
            onClick={() => setFilter('top')}
            className={activeFilter === 'top' ? 'active' : ''}
            style={{ opacity: '0.5' }}
          >
            <strong>Top Tracks</strong>
          </li>
          <li
            onClick={() => setFilter('favourites')}
            className={activeFilter === 'favourites' ? 'active' : ''}
            style={{ opacity: '0.5' }}
          >
            <strong>Favourites</strong>
          </li>
          <li
            onClick={() => setFilter('recent')}
            className={activeFilter === 'recent' ? 'active' : ''}
            style={{ opacity: '0.5' }}
          >
            <strong>Recently Played</strong>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;




