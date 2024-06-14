import React, { useRef, useEffect, useContext, useState } from 'react';
import { ArtistContext } from '../context/ArtistContext';
import { 
  FaXmark, 
  FaRegSquare, 
  FaMinus, 
  FaMagnifyingGlass, 
  FaEllipsis, 
  FaAngleLeft, 
  FaAngleRight, 
  FaHouse,
  FaArrowRightToBracket,
  FaPlus,
  FaListUl
} from "react-icons/fa6";

function Spotify() {
  const boxRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const { artist, albums, topTracks, fetchArtistData, clearArtistData } = useContext(ArtistContext); // Assuming you have a clearArtistData function in your context
  const [artistName, setArtistName] = useState('');

  useEffect(() => {
    const box = boxRef.current;
    const header = headerRef.current;
    const form = formRef.current;

    const centerBox = () => {
      const parentRect = box.parentElement.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      const centerX = (parentRect.width - boxRect.width) / 2;
      const centerY = (parentRect.height - boxRect.height) / 2;
      box.style.left = `${centerX}px`;
      box.style.top = `${centerY}px`;
    };
    centerBox();

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const onMouseDown = (e) => {
      if (form.contains(e.target)) {
        return;
      }
      isDragging = true;
      offsetX = e.clientX - box.getBoundingClientRect().left;
      offsetY = e.clientY - box.getBoundingClientRect().top;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      const rect = box.getBoundingClientRect();
      const parentRect = box.parentElement.getBoundingClientRect();

      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + rect.width > parentRect.width) newX = parentRect.width - rect.width;
      if (newY + rect.height > parentRect.height) newY = parentRect.height - rect.height;

      box.style.left = `${newX}px`;
      box.style.top = `${newY}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    header.addEventListener('mousedown', onMouseDown);

    return () => {
      header.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  const handleInputChange = (event) => {
    setArtistName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchArtistData(artistName);
    setArtistName('');
    inputRef.current.blur(); // Unfocus the input field
  };

  const handleClearArtist = () => {
    clearArtistData(); // Call the context function to clear artist data
  };

  return (
    <div ref={boxRef} className="box">
      <header ref={headerRef}>
        <div className='top-left'>
          <nav>
            <ul className='flex'>
              <li><FaEllipsis/></li>
              <li className='flex arrows'>
                <FaAngleLeft/>
                <FaAngleRight/>
              </li>
              <li onClick={handleClearArtist}>
                <FaHouse/>
              </li>
            </ul>
          </nav>
        </div>
        <div className='top-center'>
          <form ref={formRef} onSubmit={handleSubmit} className='searchs'>
            <button type='submit' className='search-button'>
              <FaMagnifyingGlass />
            </button>
            <input 
              type='text' 
              placeholder='Search for an Artist' 
              name='inputbar'
              autoComplete='false'
              value={artistName}
              onChange={handleInputChange}
              ref={inputRef}
            />
          </form>
        </div>
        <div className='top-right'>
          <nav>
            <ul className='flex'>
              <li><FaMinus/></li>
              <li><FaRegSquare className='square'/></li>
              <li><FaXmark/></li>
            </ul>
          </nav>
        </div>
      </header>
      <section className='main flex'>
        <aside className='playlist'>
          <div className='flex library'>
            <h2>Your Library</h2>
            <div className='flex'>
            <FaPlus/>
            <FaArrowRightToBracket/>
            </div>
          </div>
          <div className='options center'>
            <ul className='flex'>
              <li>Playlist</li>
              <li>Albums</li>
              <li>Artist</li>
            </ul>
            <div>
              <FaMagnifyingGlass/>
              <FaListUl/>
            </div>
          </div>
          {/*
          <ul className='lists'>
            <li className='flex'>
              <div className='playlist-icon'></div>
              <h3>Liked Songs</h3>
            </li>
            <li className='flex'>
              <div className='playlist-icon'></div>
              <h3>Liked Songs</h3>
            </li>
            <li className='flex'>
              <div className='playlist-icon'></div>
              <h3>Liked Songs</h3>
            </li>
            <li className='flex'>
              <div className='playlist-icon'></div>
              <h3>Liked Songs</h3>
            </li>
          </ul>
          */}
        </aside>
        <div className='center-box'>
          {artist ? (
            <div>
              <section className='center artist-header'>
                <figure className='artist-pic'>
                  <img src={artist.images[0]?.url} alt={artist.name} />
                </figure>
                <div className='artist-title center'>
                  <h2>{artist.name}</h2>
                </div>
                <div className='stats flex gap-20'>
                  <div className='center'>
                    <p>{artist.followers.total}</p>
                    <span>followers</span>
                  </div>
                  <div className='center'>
                    <p>{albums.length}</p>
                    <span>Albums</span>
                  </div>
                </div>
                <div className='popular'>
                  <h3>Popular</h3>
                  <ul>
                    {topTracks.map(track => (
                      <li key={track.id}>
                        {track.name} - {track.album.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='albums'>
                  <h3>Albums</h3>
                  <ul>
                    {albums.map(album => (
                      <li key={album.id}>
                        {album.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          ) : (
            <div className='not-found'>
            <p>No artist selected</p>
            </div>
          )}
        </div>
        <div className='right-box'>
          
        </div>
      </section>
    </div>
  );
}

export default Spotify;
