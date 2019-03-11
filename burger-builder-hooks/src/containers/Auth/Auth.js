import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.scss';
import * as actions from '../../store/actions/';
import { checkValidity } from '../../shared/utility';

const auth = (props) => {

    const [signForm, setSignForm] = useState({
        email: {
            elementType: 'email',
            elementConfig: {
                type: 'email',
                placeholder: 'my@email.com'
            },
            elementValue: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            filled: false
        },
        password: {
            elementType: 'password',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            elementValue: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            filled: false
        },
    });

    const [isSignup, setIsSignup] = useState(false);

    const [canSubmit, setCanSubmit] = useState(false);

    // componentDidMount() {
    useEffect(() => {
        if (!props.building && props.redirectPath !== '/') {
            props.onSetRedirect();
        }
    }, []);
    // }

    const handleChangeInput = (event, inputIdentifier) => {
        const updatedSignForm = {
            ...signForm,
            [inputIdentifier]: {
                ...signForm[inputIdentifier],
                elementValue: event.target.value,
                valid: checkValidity(event.target.value, signForm[inputIdentifier].validation),
                filled: true,
            },
        };

        let formIsValid = true;

        for (let inputIdentifier in updatedSignForm) {
            formIsValid = (typeof updatedSignForm[inputIdentifier].valid === 'boolean')
                ? updatedSignForm[inputIdentifier].valid && formIsValid
                : formIsValid;
        }

        /* this.setState({
            signForm: updatedSignForm,
            submit: formIsValid,
        }); */
        setSignForm(updatedSignForm);
        setCanSubmit(formIsValid);
    };

    const handleSign = (event) => {
        event.preventDefault();
        props.onAuth(
            signForm.email.elementValue,
            signForm.password.elementValue,
            isSignup);
    };

    const handleSwitchSignMode = () => {
        setIsSignup(!isSignup);
    };

    const formElements = [];

    for (let key in signForm) {
        formElements.push({
            id: key,
            config: signForm[key],
        });
    }

    let form = formElements.map(formElement => (
        <Input
            key={formElement.id}
            elementName={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            elementValue={formElement.config.elementValue}
            validation={formElement.config.validation}
            invalid={!formElement.config.valid}
            filled={formElement.config.filled}
            changed={(event) => handleChangeInput(event, formElement.id)}/>
    ));

    if (props.loading) {
        form = <Spinner/>;
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let redirect = null;
    if (props.logged) {
        redirect = <Redirect to={props.redirectPath}/>;
    }

    return (
        <div className={styles.Auth}>
            {redirect}
            {errorMessage}
            <form>
                {form}
                <Button type="Success" clicked={handleSign} disabled={!canSubmit}>{isSignup ? 'Sign up' : 'Sign in'}</Button>
            </form>
            <Button type="Danger" clicked={handleSwitchSignMode}>Switch to {!isSignup ? 'sign up' : 'sign in'}</Button>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        logged: state.authReducer.token,
        building: state.builderReducer.building,
        redirectPath: state.authReducer.redirectPath,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetRedirect: () => dispatch(actions.setRedirect())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);
