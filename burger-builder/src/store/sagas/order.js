import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* purchase(action) {
    yield put(actions.purchaseStart());
    try {
        const response = yield axios.post('/orders.json', action.orderData, {
            params: {
                auth: action.token,
            }
        });
        yield put(actions.purchaseSuccess(response.data.name, action.orderData));
    } catch(error) {
        yield put(actions.purchaseFail(error))
    };

}

export function* fetchOrders(action) {
    yield put(actions.fetchOrdersStart());
    try {
        const response = yield axios.get('/orders.json', {
            params: {
                auth: action.token,
                orderBy: '"user"',
                equalTo: `"${action.user}"`,
            }
        });
        const fetchedOrders = [];

        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key,
            });
        }

        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch(error) {
        yield put(actions.fetchOrdersFail(error));
    };

}