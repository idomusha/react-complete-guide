import React from 'react';

import styles from './Button.scss';

const button = (props) => (
    <button
    className={[styles.Button, styles[props.buttonType]].join(' ')}
        onClick={props.clicked}
    >
        {props.children}
    </button>
);

export default button;
