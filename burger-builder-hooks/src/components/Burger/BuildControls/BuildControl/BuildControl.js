import React from 'react';

import styles from './BuildControl.scss';

const BuildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button
            className={styles.Less}
            onClick={props.removed}
            disabled={props.disabled.min}>
            Less
        </button>
        <button
            className={styles.More}
            onClick={props.added}
            disabled={props.disabled.max}>
            More
        </button>
    </div>
);

export default BuildControl;
