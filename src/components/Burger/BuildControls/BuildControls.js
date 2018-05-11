import React from 'react';

import styles from './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl.js';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];
const buildControls = (props) => (
    <div className={styles.BuildControls}>
    <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >Order</button>
    </div>
);

export default buildControls;