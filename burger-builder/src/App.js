// @ts-nocheck

import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import Builder from './containers/Builder/Builder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {

  componentDidMount() {
    this.props.onAutoSignin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/sign" component={asyncAuth} />
        <Route path="/" exact component={Builder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.logged) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/sign" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Builder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.authReducer.token !== null,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignin: () => dispatch(actions.checkState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
