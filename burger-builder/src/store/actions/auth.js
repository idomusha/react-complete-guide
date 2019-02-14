// import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        user,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const logout = () => {

    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('user');

    return {
        // type: actionTypes.AUTH_LOGOUT,
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    /* return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    } */
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime
    };
};

export const auth = (email, password, isSignup) => {
    /* return dispatch => {
        dispatch(authStart());
        // console.log('isSignup', isSignup);
        const API_KEY = 'AIzaSyDSQt9hMYteuwKyWKl2Qma1JBZLnwWoBqA'
        const SIGNUP_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;
        const SIGNIN_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;
        axios.post(
            isSignup ? SIGNUP_URL : SIGNIN_URL,
            {
                email,
                password,
                returnSecureToken: true,
            })
            .then((response) => {
                var expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('user', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error));
            });
    }; */
    return {
        type: actionTypes.AUTH,
        email,
        password,
        isSignup,
    }
};

export const setRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
}

export const checkState = () => {
    /* return dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const user = localStorage.getItem('user');
                dispatch(authSuccess(token, user));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
                return true;
            }
        }
        dispatch(logout());
        return false;
    }; */
    return {
        type: actionTypes.AUTH_CHECK_STATE,
    };
};