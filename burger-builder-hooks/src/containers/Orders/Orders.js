import React, { useEffect } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const orders = (props) => {
    /* state = {
        orders: [],
        loading: true,
    }; */

    useEffect(() => {
        props.onFetchOrders(props.token, props.user);
    }, []);

    let orders = <Spinner/>;

    if (!props.loading) {
        orders = props.orders.map(order => (
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
