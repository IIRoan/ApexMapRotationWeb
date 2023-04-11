import React from 'react';
import stylesloader from './preloader.module.scss';

export default function Preloader(props) {
    return (
        <div className={stylesloader.container} style={{opacity: props.loaded ? 0 : 1}}>
            <div className={stylesloader.loader}>
            </div>
        </div>
    );
}