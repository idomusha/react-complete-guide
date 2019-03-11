import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

/* const INGREDIENT_PRICES = {
    salad: 0.879,
    bacon: 1.783,
    cheese: 1.324,
    meat: 3.473,
} */
export const builder = (props) => {
    /* constructor(props) {
        super(props);
        this.state = {
            // ingredients: null,
            // price: 4,
            // purchasable: false,
            purchasing: false,
            // loading: false,
        }
    } */

    const [purchasing, setPurchasing] = useState(false);

    // componentDidMount() {
    useEffect(() => {
        props.onInitIngredients();
    }, []);
    // }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((ingredientKey) => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        // this.setState({purchasable: sum > 0});
        return sum > 0;
    }

    /* handleAddIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    handleRemoveIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {

            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
        this.updatePurchaseState(updatedIngredients);
    } */

    const handlePurchase = () => {
        if (props.logged) {
            setPurchasing(true);
        } else {
            props.onSetRedirect('/checkout');
            props.history.push('/sign');
        }

    }

    const handleCancelPurchase = () => {
        setPurchasing(false);
    }

    const handleContinuePurchase = () => {
        /* const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        }); */
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = {
            min: disabledInfo[key] <= 0,
            max: disabledInfo[key] >= 3,
        };
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if (props.ingredients) {
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ingredients}/>
                <BuildControls
                    ingredientAdded={props.onAddIngredient}
                    ingredientRemoved={props.onRemoveIngredient}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ingredients)}
                    ordered={handlePurchase}
                    logged={props.logged}
                />
            </React.Fragment>
        );
        orderSummary = <OrderSummary
            ingredients={props.ingredients}
            price={props.price}
            purchaseCancelled={handleCancelPurchase}
            purchaseContinued={handleContinuePurchase}
        />;
    }

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={handleCancelPurchase}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );

}


const mapStateToProps = (state) => {
    return {
        ingredients: state.builderReducer.ingredients,
        price: state.builderReducer.totalPrice,
        error: state.builderReducer.error,
        logged: state.authReducer.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (name) => dispatch(actions.addIngredient(name)),
        onRemoveIngredient: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirect: (path) => dispatch(actions.setRedirect(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(builder, axios));