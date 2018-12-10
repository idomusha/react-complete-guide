import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            user: null,
            error: null,
            loading: false,
            redirectPath: '/',
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            user: null,
            error: null,
            loading: false,
            redirectPath: '/',
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'a-token',
            user: 'an-user',
        })).toEqual({
            token: 'a-token',
            user: 'an-user',
            error: null,
            loading: false,
            redirectPath: '/',
        });
    });
});