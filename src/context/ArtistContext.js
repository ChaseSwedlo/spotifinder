import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const ArtistContext = createContext();
export const ArtistProvider = ({ children }) => {
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [token, setToken] = useState(null);
    const [history, setHistory] = useState([]);
    const clientId = '465d2502d50b478abc71c3e6f1d6d02a';
    const clientSecret = '91fb05a9fb4a4756afc291dc3f8e2664';

    useEffect(() => {
        const fetchToken = async () => {
            const newToken = await getSpotifyToken();
            setToken(newToken);
        };
        fetchToken();
        const savedHistory = JSON.parse(localStorage.getItem('artistHistory')) || [];
        setHistory(savedHistory);
    }, []);
    const fetchArtistData = async (artistName, addToHistory = true) => {
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
                if (addToHistory && !history.some(item => item.name === artist.name)) {
                    const newHistoryItem = {
                        name: artist.name,
                        image: artist.images[2]?.url || ''
                    };
                    const newHistory = [...history, newHistoryItem];
                    setHistory(newHistory);
                    localStorage.setItem('artistHistory', JSON.stringify(newHistory));
                }
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
    const removeArtistFromHistory = (artistName) => {
        const updatedHistory = history.filter(item => item.name !== artistName);
        setHistory(updatedHistory);
        localStorage.setItem('artistHistory', JSON.stringify(updatedHistory));
    };
    return (
        <ArtistContext.Provider value={{ artist, albums, topTracks, fetchArtistData, clearArtistData, history, removeArtistFromHistory }}>
            {children}
        </ArtistContext.Provider>
    );
};