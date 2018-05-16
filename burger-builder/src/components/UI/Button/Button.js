import React from 'react';

import styles from './Button.scss';

const button = (props) => {
    let content = (
        <button
            className={[styles.Button, styles[props.type]].join(' ')}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    );
    if (props.type === 'toggle-sidedrawer') {
        content = (
            <div
                className={[styles.btn, styles[props.type], props.opened ? styles.active : ''].join(' ')}
                onClick={props.clicked}
            >
                <i className={styles.top}></i>
                <i className={styles.middle}></i>
                <i className={styles.bottom}></i>
            </div>
        );
    }
    return content;
};

export default button;
