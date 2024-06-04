import React, { useState, useContext } from 'react';
import { ArtistContext } from '../context/ArtistContext';

const ArtistSearch = () => {
    const { artist, albums, fetchArtistData } = useContext(ArtistContext);
    const [artistName, setArtistName] = useState('');

    const handleSearch = () => {
        fetchArtistData(artistName);
    };

    return (
        <div>
            <h1>Spotify Artist Search</h1>
            <input 
                type="text" 
                value={artistName} 
                onChange={(e) => setArtistName(e.target.value)} 
                placeholder="Enter artist name" 
            />
            <button onClick={handleSearch}>Search</button>

            {artist && (
                <div>
                    <h2>{artist.name}</h2>
                    <img src={artist.images[0]?.url} alt={artist.name} style={{ width: '200px' }} />
                    <h3>Albums</h3>
                    <ul>
                        {albums.map(album => (
                            <li key={album.id}>{album.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ArtistSearch;
