import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Orders extends Component {
    /* state = {
        orders: [],
        loading: true,
    }; */

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.user);
    }

    render() {
        let orders = <Spinner/>;

        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ));
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, user) => dispatch(actions.fetchOrders(token, user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
