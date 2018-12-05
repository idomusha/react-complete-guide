import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

import styles from './ContactData.scss';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'text',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Jane Doe'
                },
                elementValue: '',
                validation: {
                    required: true,
                },
                valid: false,
                filled: false
            },
            street: {
                elementType: 'text',
                elementConfig: {
                    type: 'text',
                    placeholder: '123 Ever Street'
                },
                elementValue: '',
                validation: {
                    required: true,
                },
                valid: false,
                filled: false
            },
            zipCode: {
                elementType: 'text',
                elementConfig: {
                    type: 'text',
                    placeholder: 'X1Y 2Z3'
                },
                elementValue: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                },
                valid: false,
                filled: false
            },
            country: {
                elementType: 'text',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Canada'
                },
                elementValue: '',
                validation: {
                    required: true,
                },
                valid: false,
                filled: false
            },
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
            deliveryMethod: {
                elementType: 'radio',
                elementConfig: {
                    options: [
                        {
                            display: 'Fastest',
                            value: 'fastest',
                        },
                        {
                            display: 'Cheapest',
                            value: 'cheapest',
                        },
                    ]
                },
                elementValue: '',
                validation: {
                    required: true,
                },
                valid: false,
                filled: false
            },
        },
        submit: false,
    };

    handleOrder = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].elementValue;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: formData,
            user: this.props.user
        };

        this.props.onOrderBurger(order, this.props.token);
    }

    handleChangeInput = (event, inputIdentifier) => {

        const updatedOrderFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            elementValue: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            filled: true,
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedOrderFormElement,
        });

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = typeof updatedOrderForm[inputIdentifier].valid === 'boolean' ? updatedOrderForm[inputIdentifier].valid && formIsValid : formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            submit: formIsValid,
        });
    }

    render() {
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (
            <form>
                {formElements.map(formElement => (
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
                ))}
                <Button type="Success" clicked={this.handleOrder} disabled={!this.state.submit}>Order</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={styles.ContactData}>
                <h4>Your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.builderReducer.ingredients,
        price: state.builderReducer.totalPrice,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        user: state.authReducer.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchase(orderData, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
