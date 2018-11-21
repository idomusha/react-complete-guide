import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
// import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
};

const INGREDIENT_PRICES = {
    salad: 0.879,
    bacon: 1.783,
    cheese: 1.324,
    meat: 3.473,
}

const addIngredient = (state, action) => {
/* return updateObject(state, {
                ingredients: updateObject(state.ingredients, {
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }),
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            }); */
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true,
            };
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
    };
};

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: initialState.totalPrice,
        error: false,
        building: false,
    };
};

const fetchIngredientsFailed = (state, action) => {
    return {
        ...state,
        error: true,
    };
};

const reducer = (state = initialState, action) => {
    console.log('builder', action.type);
    switch( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;