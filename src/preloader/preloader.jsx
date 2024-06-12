import React, { useEffect, useState } from 'react';
import stylesloader from './preloader.module.scss';

export default function Preloader({ loaded }) {
    const [shouldRender, setRender] = useState(true);

    useEffect(() => {
        if (loaded) {
            const timer = setTimeout(() => setRender(false), 500);
            return () => clearTimeout(timer);
        } else {
            setRender(true);
        }
    }, [loaded]);

    return (
        shouldRender && (
            <div className={stylesloader.container} style={{ opacity: loaded ? 0 : 1, transition: 'opacity 0.5s ease-out' }}>
                <div className={stylesloader.loader}></div>
            </div>
        )
    );
}
