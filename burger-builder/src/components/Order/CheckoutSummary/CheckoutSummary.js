import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './CheckoutSummary.scss';

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Summary</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                type="Danger"
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button
                type="Success"
                clicked={props.checkoutContinued}>Continue</Button>
        </div>
    );
};

export default checkoutSummary;
