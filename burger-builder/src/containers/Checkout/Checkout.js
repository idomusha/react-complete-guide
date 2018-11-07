import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';

class Checkout extends Component {
    /* state = {
        ingredients: null,
        totalPrice: 0,
    } */

    /* componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
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

    handleCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    handleCheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/>;

        if (!this.props.ingredients || this.props.purchased) {
            summary = <Redirect to="/"/>
        } else {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.handleCheckoutCancelled}
                        checkoutContinued={this.handleCheckoutContinued} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        /* render={(props) => (
                            <ContactData
                                ingredients={this.props.ingredients}
                                price={this.props.price}
                                {...props} />
                        )} */
                        component={ContactData}
                        />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.builderReducer.ingredients,
        purchased: state.orderReducer.purchased,
    };
}

export default connect(mapStateToProps)(Checkout);
