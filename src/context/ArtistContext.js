import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ArtistContext = createContext();

export const ArtistProvider = ({ children }) => {
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [token, setToken] = useState(null);

    const clientId = '465d2502d50b478abc71c3e6f1d6d02a';
    const clientSecret = '91fb05a9fb4a4756afc291dc3f8e2664';

    const fetchArtistData = async (artistName) => {
        try {
            if (!token) {
                const newToken = await getSpotifyToken();
                setToken(newToken);
            }

            const artistResponse = await axios.get(`https://api.spotify.com/v1/search`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    q: artistName,
                    type: 'artist'
                }
            });

            const artist = artistResponse.data.artists.items[0];
            setArtist(artist);

            if (artist) {
                const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAlbums(albumsResponse.data.items);

                const topTracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        market: 'US'
                    }
                });
                setTopTracks(topTracksResponse.data.tracks);
            }
        } catch (error) {
            console.error('Error fetching artist data', error);
        }
    };

    const getSpotifyToken = async () => {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
            },
            params: {
                grant_type: 'client_credentials'
            }
        });
        return response.data.access_token;
    };

    const clearArtistData = () => {
        setArtist(null);
        setAlbums([]);
        setTopTracks([]);
    };

    useEffect(() => {
        const fetchToken = async () => {
            const newToken = await getSpotifyToken();
            setToken(newToken);
        };
        fetchToken();
    }, []);

    return (
        <ArtistContext.Provider value={{ artist, albums, topTracks, fetchArtistData, clearArtistData }}>
            {children}
        </ArtistContext.Provider>
    );
};
