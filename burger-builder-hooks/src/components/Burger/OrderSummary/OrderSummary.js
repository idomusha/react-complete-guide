import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return (
                <li key={ingredientKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {ingredientKey}
                    </span>: {props.ingredients[ingredientKey]}
                </li>
            );
        });

    return (
        <React.Fragment>
            <h3>Modal title</h3>
            <p>A paragraph to detail a bit more.</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total: <strong>{props.price.toFixed(2)}</strong></p>
            <Button type="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button type="Success" clicked={props.purchaseContinued}>Continue</Button>
        </React.Fragment>
    );
}
export default orderSummary;
