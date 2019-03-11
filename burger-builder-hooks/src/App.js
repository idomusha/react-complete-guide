// @ts-nocheck

import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import Builder from './containers/Builder/Builder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

// const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
// const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
// const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const app = (props) => {

  useEffect(
    () => {
      props.onAutoSignin();
    },
    []  // run once when the component is mounted
  );


    let routes = (
      <Switch>
        <Route path="/sign" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={Builder} />
        <Redirect to="/" />
      </Switch>
    );

    if (props.logged) {
      routes = (
        <Switch>
          <Route path="/checkout" render={(props) => <Checkout {...props} />} />
          <Route path="/orders" render={(props) => <Orders {...props} />} />
          <Route path="/sign" render={(props) => <Auth {...props} />} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Builder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    );

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
