
import { delay, put, call } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../actions';

export function* logout(action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'user');
    /* yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem(''); */
    yield put(actions.logoutSuccess());
}

export function* checkAuthTimeout(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* auth(action) {
    yield put(actions.authStart());
    console.log('AUTH START');
    const API_KEY = 'AIzaSyDSQt9hMYteuwKyWKl2Qma1JBZLnwWoBqA'
    const SIGNUP_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;
    const SIGNIN_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;

    try{
        const response = yield axios.post(
            action.isSignup ? SIGNUP_URL : SIGNIN_URL,
            {
                email: action.email,
                password: action.password,
                returnSecureToken: true,
            });
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('user', response.data.localId);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch(error) {
        yield put(actions.authFail(error.response.data.error));
    }

}

export function* checkState(action) {

    const token = yield localStorage.getItem('token');
    if (token) {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            const user = yield localStorage.getItem('user');
            yield put(actions.authSuccess(token, user));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            return true;
        }
    }
    yield put(actions.logout());
    return false;

}