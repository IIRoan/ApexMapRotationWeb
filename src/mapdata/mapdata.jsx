import React, { useState, useEffect } from 'react';
import axios from "axios";
import Countdown from 'react-countdown';
import { zeroPad } from "react-countdown";
import styles from "./mapdata.module.scss";
import nessie_icon from './nessie.ico';
import heart from './heart.png';
import Preloader from '../preloader/preloader';

const AL_API_KEY = import.meta.env.VITE_ALAPIKEY;

function MapPage() {
    const [hover, setHover] = useState(false);
    const [mapRotation, setMapRotation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [setError] = useState(false);
    const [isRanked, setRanked] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://api.mozambiquehe.re/maprotation?version=2&auth=${AL_API_KEY}`)
            .then(response => {
                setMapRotation(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Api error: too many requests");
                setError(true);
                setIsLoading(false);
            });
    }, [isRanked]);

    const Completionist = () => window.location.reload(false);

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
    };

    return (
        <div>
            <Preloader loaded={!isLoading}/>
            {!isLoading && (
                <div className={styles.map_grid}>
                    {isRanked ? (
                        <div className={styles.map_grid}>
                            <div className={styles.div1}>
                                <img src={mapRotation.battle_royale.current.asset} alt="CurrentMapIcon" />
                            </div>
                            <div className={styles.div2}>
                                <h2 className={styles.current_map_header}>{mapRotation.battle_royale.current.map}</h2>
                                <h2><br/>
                                    <Countdown
                                        date={Date.now() + mapRotation.battle_royale.current.remainingSecs * 1000}
                                        renderer={renderer}
                                    />
                                </h2>
                                <h2>Next normals map: <br/>{mapRotation.battle_royale.next.map}</h2>
                                <button className={styles.rotation_button} onClick={() => setRanked(!isRanked)}>
                                    <img alt={"Nessie!"} src={nessie_icon} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}/>
                                    {hover && <img className={styles.hearticon} src={heart} alt="Heart Icon"/>}
                                    <a>{isRanked ? 'Show Normals' : 'Show Ranked'}</a>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.map_grid}>
                            <div className={styles.div1}>
                                <img src={mapRotation.ranked.current.asset} alt="CurrentMapIcon" />
                            </div>
                            <div className={styles.div2}>
                                <h2 className={styles.current_map_header}>{mapRotation.ranked.current.map}</h2>
                                <h2><br/>
                                    <Countdown
                                        date={Date.now() + mapRotation.ranked.current.remainingSecs * 1000}
                                        renderer={renderer}
                                    />
                                </h2>
                                <h2>Next ranked map: <br/>{mapRotation.ranked.next.map}</h2>
                                <button className={styles.rotation_button} onClick={() => setRanked(!isRanked)}>
                                    <img alt={"Nessie!"} src={nessie_icon} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}/>
                                    {hover && <img className={styles.hearticon} src={heart} alt="Heart Icon"/>}
                                    <a>{isRanked ? 'Show Normals' : 'Show Ranked'}</a>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MapPage;
