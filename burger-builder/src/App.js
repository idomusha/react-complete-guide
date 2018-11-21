// @ts-nocheck

import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Builder from './containers/Builder/Builder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
class App extends Component {


  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/sign" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Builder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
