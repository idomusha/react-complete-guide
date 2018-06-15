import React, { Component } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.879,
    bacon: 1.783,
    cheese: 1.324,
    meat: 3.473,
}
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false,
        }
    }

    componentDidMount() {
        axios.get('/ingredients.json')
        .then((response) => {
            this.setState({
                ingredients: response.data
            });
        })
        .catch((error) => {
            this.setState({
                error: true
            });
            console.log(error);
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        this.setState({purchasable: sum > 0})
    }

    handleAddIngredient = (type) => {
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
    }

    handlePurchase = () => {
        this.setState({
            purchasing: true,
        });
    }

    handleCancelPurchase = () => {
        this.setState({
            purchasing: false,
        });
    }

    handleContinuePurchase = () => {
        this.setState({
            loading: true,
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.ingredients,
            customer: {
                name: 'Nicolas',
                address: {
                    street: '7777 Decarie',
                    zipCode: 'H4P 2H2',
                    country: 'Canada'
                },
                email: 'idomusha@soot.black'
            },
            deliveryMethod: 'fastest',
        };
        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({
                    loading: false,
                    purchasing: false,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    purchasing: false,
                });
                console.log(error);
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (this.state.ingredients !== null) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.handleAddIngredient}
                        ingredientRemoved={this.handleRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.handlePurchase}
                    />
                </React.Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.handleCancelPurchase}
                purchaseContinued={this.handleContinuePurchase}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
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

export default withErrorHandler(BurgerBuilder, axios);