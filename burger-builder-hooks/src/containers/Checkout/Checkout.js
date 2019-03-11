import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = (props) => {
    /* state = {
        ingredients: null,
        totalPrice: 0,
    } */

    /* componentWillMount() {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }

        }
        this.setState({
            ingredients: ingredients,
            totalPrice: Number.parseFloat(price).toFixed(2),
        });
    } */

    const handleCheckoutCancelled = () => {
        props.history.goBack();
    }

    const handleCheckoutContinued = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/"/>;

    if (!props.ingredients || props.purchased) {
        summary = <Redirect to="/"/>
    } else {
        summary = (
            <div>
                <CheckoutSummary
                    ingredients={props.ingredients}
                    checkoutCancelled={handleCheckoutCancelled}
                    checkoutContinued={handleCheckoutContinued} />
                <Route
                    path={props.match.path + '/contact-data'}
                    /* render={(props) => (
                        <ContactData
                            ingredients={props.ingredients}
                            price={props.price}
                            {...props} />
                    )} */
                    component={ContactData}
                    />
            </div>
        );
    }

    return summary;

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.builderReducer.ingredients,
        purchased: state.orderReducer.purchased,
    };
}

export default connect(mapStateToProps)(checkout);
