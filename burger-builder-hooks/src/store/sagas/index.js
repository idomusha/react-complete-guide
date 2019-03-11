import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logout, checkAuthTimeout, auth, checkState } from './auth';
import { initIngredients } from './builder';
import { purchase, fetchOrders } from './order';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logout),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeout),
        takeEvery(actionTypes.AUTH, auth),
        takeEvery(actionTypes.AUTH_CHECK_STATE, checkState),
    ]);
}

export function* watchBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredients);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE, purchase);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrders);
}