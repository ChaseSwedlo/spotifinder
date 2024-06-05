import React from 'react';
import { ArtistProvider } from './context/ArtistContext.js';
import './css/index.css';
import Spotify from './components/Spotify.js';

const App = () => {
    return (
        <main>
          <section className='bg'>
            <ArtistProvider>
              <Spotify/>
            </ArtistProvider>
            </section>
        </main>
    );
};

export default App;