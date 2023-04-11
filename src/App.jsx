import React, {useState, useEffect} from 'react';
import MapPage from './mapdata/mapdata';
import Navbar from './navbar/navbar';
import './global.scss'
import Preloader from "./preloader/preloader.jsx";


function App() {

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        // The wait timer for the preloader
        setTimeout(() => {
            setLoaded(true);
        }, 800);

    }, [])

    return (<>
        <Preloader loaded={loaded}/>
        <body>
        <div>
            <Navbar/>
            <MapPage/>
        </div>
        </body>
    </>);
}

export default App;