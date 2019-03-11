import React from 'react';

import styles from './Order.scss';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map( (ingredient) => {
        if(ingredient.amount > 0) {
            return <span
            key="ingredient.name"
            style={{
                display: 'inline-block',
                padding: '5px 10px',
                margin: '0 10px',
                border: '1px solid lightgrey',
            }}>{ingredient.name} ({ingredient.amount})</span>
        }
    })

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>CAD {props.price}</strong></p>
        </div>
    );
}

export default order;
