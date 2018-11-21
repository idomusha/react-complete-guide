import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.scss';
import * as actions from '../../store/actions/';

class Auth extends Component {

    state = {
        signForm: {
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
        },
        isSignup: false,
    };

    componentDidMount() {
        if (!this.props.building && this.props.redirectPath !== '/') {
            this.props.onSetRedirect();
        }
    }

    handleChangeInput = (event, inputIdentifier) => {
        const updatedSignForm = {
            ...this.state.signForm,
            [inputIdentifier]: {
                ...this.state.signForm[inputIdentifier],
                elementValue: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.signForm[inputIdentifier].validation),
                filled: true,
            },
        };

        let formIsValid = true;

        for (let inputIdentifier in updatedSignForm) {
            formIsValid = typeof updatedSignForm[inputIdentifier].valid === 'boolean' ? updatedSignForm[inputIdentifier].valid && formIsValid : formIsValid;
        }

        this.setState({
            signForm: updatedSignForm,
            submit: formIsValid,
        });
    };

    handleSign = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.signForm.email.elementValue,
            this.state.signForm.password.elementValue,
            this.state.isSignup);
    };

    handleSwitchSignMode = () => {
        this.setState(state => {
            return {
                isSignup: !state.isSignup,
            };
        });
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    render() {
        const formElements = [];

        for (let key in this.state.signForm) {
            formElements.push({
                id: key,
                config: this.state.signForm[key],
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
                changed={(event) => this.handleChangeInput(event, formElement.id)}/>
        ));

        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let redirect = null;
        if (this.props.logged) {
            redirect = <Redirect to={this.props.redirectPath}/>;
        }

        return (
            <div className={styles.Auth}>
                {redirect}
                {errorMessage}
                <form>
                    {form}
                    <Button type="Success" clicked={this.handleSign} disabled={!this.state.submit}>{this.state.isSignup ? 'Sign up' : 'Sign in'}</Button>
                </form>
                <Button type="Danger" clicked={this.handleSwitchSignMode}>Switch to {!this.state.isSignup ? 'sign up' : 'sign in'}</Button>
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
