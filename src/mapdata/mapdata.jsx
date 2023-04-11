import styles from "./mapdata.module.scss";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import Countdown from 'react-countdown';
import {zeroPad} from "react-countdown";
import nessie_icon from './nessie.ico'

const AL_API_KEY = import.meta.env.VITE_ALAPIKEY;


function MapPage() {


    const [mapRotation, setMapRotation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [setError] = useState(false);
    const [isRanked, setRanked] = useState(true);


    useEffect(() => {
        axios.get('https://api.mozambiquehe.re/maprotation?version=2&auth=' + AL_API_KEY)

            .then(response => {
                setMapRotation(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Api error: too many requests");
                setError(true);
            });

    }, []);


    const Completionist = () => window.location.reload(false);

    // Renderer callback with condition
    const renderer = ({minutes, seconds, completed}) => {
        if (completed) {
            // Reload page for new map
            return <Completionist/>;
        } else {
            // Render a countdown
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
    };

    return (

        <div>

            {isLoading ? (
                <p>Error, too many api requests</p>
            ) : (
                <div className={styles.map_grid}>

                    {isRanked ? (
                        <div>
                            <div className={styles.map_grid}>
                                <div className={styles.div1}>
                                    <img
                                        src={mapRotation.battle_royale.current.asset}
                                        alt="CurrentMapIcon"
                                    />
                                </div>
                                <div className={styles.div2}>
                                    <h2 className={styles.current_map_header}>{mapRotation.battle_royale.current.map}</h2>
                                    <h2><br/>
                                        <Countdown
                                            date={Date.now() + mapRotation.battle_royale.current.remainingSecs * 1000}
                                            renderer={renderer}
                                        />
                                    </h2>
                                    <h2>Next ranked map: <br/>{mapRotation.battle_royale.next.map}</h2>
                                    <button className={styles.rotation_button} onClick={() => setRanked(!isRanked)}>
                                        <img alt={"Nessie!"} src={nessie_icon}/>
                                        <a> {isRanked ? 'Show Normals' : 'Ranked'} </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.map_grid}>
                                <div className={styles.div1}>
                                    <img
                                        src={mapRotation.ranked.current.asset}
                                        alt="CurrentMapIcon"
                                    />
                                </div>
                                <div className={styles.div2}>
                                    <h2 className={styles.current_map_header}>{mapRotation.ranked.current.map}</h2>
                                    <h2><br/>
                                        <Countdown
                                            date={Date.now() + mapRotation.ranked.current.remainingSecs * 1000}
                                            renderer={renderer}
                                        />
                                    </h2>
                                    <h2>Next map: <br/>{mapRotation.ranked.next.map}</h2>
                                    <button className={styles.rotation_button} onClick={() => setRanked(!isRanked)}>
                                        <img alt={"Nessie!"} src={nessie_icon}/>
                                        <a> {isRanked ? 'Show Normals' : 'Show  Ranked'} </a>
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            )}
            <ul>
            </ul>
        </div>

    )
}


export default MapPage