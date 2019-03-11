// import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

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

export const purchase = (orderData, token) => {
    /* return (dispatch) => {
        dispatch(purchaseStart());
        axios.post('/orders.json', orderData, {
                params: {
                    auth: token,
                }
            })
            .then((response) => {
                dispatch(purchaseSuccess(response.data.name, orderData))
            })
            .catch((error) => {
                dispatch(purchaseFail(error))
            });
    } */
    return {
        type: actionTypes.PURCHASE,
        orderData,
        token
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

export const fetchOrders = (token, user) => {
    /* return (dispatch) => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json', {
            params: {
                auth: token,
                orderBy: '"user"',
                equalTo: `"${user}"`,
            }
          })
        .then(response => {
            const fetchedOrders = [];

            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key,
                });
            }


            // this.setState({
            //     loading: false,
            //     orders: fetchedOrders,
            // });
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
            // this.setState({
            //     loading: false,
            // });
            dispatch(fetchOrdersFail(error));
        });
    }; */
    return {
        type: actionTypes.FETCH_ORDERS,
        token,
        user,
    }
}