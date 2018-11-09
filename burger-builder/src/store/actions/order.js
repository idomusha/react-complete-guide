import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: data,
    };
};

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error,
    };
};

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START,
    };
};

export const purchase = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseStart());
        axios.post('/orders.json', orderData)
            .then((response) => {
                console.log(response.data.name);
                console.log(orderData);
                dispatch(purchaseSuccess(response.data.name, orderData))
            })
            .catch((error) => {
                dispatch(purchaseFail(error))
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = () => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
        .then(response => {
            const fetchedOrders = [];

            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key,
                });
            }


            /* this.setState({
                loading: false,
                orders: fetchedOrders,
            }); */
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
            /* this.setState({
                loading: false,
            }); */
            dispatch(fetchOrdersFail(error));
        });
    };
}