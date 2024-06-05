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
  FaHouse 
} from "react-icons/fa6";

function Spotify() {
  const boxRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const { artist, albums, topTracks, fetchArtistData } = useContext(ArtistContext);
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
  };
console.log(topTracks);
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
              <li>
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
              value={artistName}
              onChange={handleInputChange}
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
        <aside>
          
        </aside>
        <div className='center-box'>
          {artist ? (
            <div>
              <h2>{artist.name}</h2>
              <p>Followers: {artist.followers.total}</p>
              <p>Genres: {artist.genres.join(', ')}</p>
              <img src={artist.images[0]?.url} alt={artist.name} />
              <h3>Albums:</h3>
              <ul>
                {albums.map(album => (
                  <li key={album.id}>{album.name}</li>
                ))}
              </ul>
              <h3>Top Tracks:</h3>
              <ul>
                {topTracks.map(track => (
                  <li key={track.id}>
                    {track.name} - {track.album.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No artist selected</p>
          )}
        </div>
        <div className='right-box'>
          
        </div>
      </section>
    </div>
  );
}

export default Spotify;
