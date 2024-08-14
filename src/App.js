import React from 'react';
import { ArtistProvider } from './context/ArtistContext.js';
import './css/index.css';
import Spotify from './components/Spotify.js';
import { AnimatePresence } from "framer-motion";

const App = () => {
    return (
        <main>
          <section className='bg'>
            <ArtistProvider>
              <AnimatePresence mode="wait">
                <Spotify/>
              </AnimatePresence>
            </ArtistProvider>
            </section>
        </main>
    );
};

export default App;