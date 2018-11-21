import React, { Component } from 'react';
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
class Builder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ingredients: null,
            // totalPrice: 4,
            // purchasable: false,
            purchasing: false,
            loading: false,
        }
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
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

    handlePurchase = () => {
        if (this.props.logged) {
            this.setState({
                purchasing: true,
            });
        } else {
            this.props.onSetRedirect('/checkout');
            this.props.history.push('/sign');
        }

    }

    handleCancelPurchase = () => {
        this.setState({
            purchasing: false,
        });
    }

    handleContinuePurchase = () => {
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
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = {
                min: disabledInfo[key] <= 0,
                max: disabledInfo[key] >= 3,
            };
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (this.props.ingredients !== null) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.handlePurchase}
                        logged={this.props.logged}
                    />
                </React.Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.price}
                purchaseCancelled={this.handleCancelPurchase}
                purchaseContinued={this.handleContinuePurchase}
            />;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.handleCancelPurchase}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.builderReducer.ingredients,
        price: state.builderReducer.totalPrice,
        error: state.builderReducer.error,
        logged: state.authReducer.logged,
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Builder, axios));