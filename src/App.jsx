import React, { useState, useEffect } from 'react';
import MapPage from './mapdata/mapdata';
import Navbar from './navbar/navbar';
import './global.scss';
import Preloader from "./preloader/preloader.jsx";

function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 400);
    }, []);

    const handleImageLoaded = () => {
        setLoaded(true);
    };

    return (
        <div className="app-container">
            <Preloader loaded={loaded} />
            <Navbar />
            <MapPage onImageLoaded={handleImageLoaded} />
        </div>
    );
}

export default App;
