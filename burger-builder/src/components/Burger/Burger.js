import React from 'react';

import styles from './Burger.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
            return <BurgerIngredient key={ingredientKey + '-' + index} type={ingredientKey}/>;
        });
    })
    .reduce((array, element) => {
        return array.concat(element);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Nothing here!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>

            {transformedIngredients}

            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;
