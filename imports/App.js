import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';
import { Router, Route, Switch, useParams } from 'react-router';
import history from 'history';
import { withTracker } from 'meteor/react-meteor-data';

import { InventoryItems } from './api/inventory_items.js';

import Admin from './pages/Admin.js';
import AdminNewInventory from './pages/AdminNewInventory.js';
import AdminShowInventory from './pages/AdminShowInventory.js';

import Index from './pages/Index.js';
import ShowNoMatch from './pages/ShowNoMatch.js';
import ShowInventoryItem from './pages/ShowInventoryItem.js';
import Header from './ui/Header.js';
const browserHistory = history.createBrowserHistory();


// App component - represents the whole app
class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Header />
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/admin/new">
          <AdminNewInventory />
        </Route>
        <Route exact path="/admin/:inventory_item" component={AdminShowInventory} />
        <Route exact path='/:inventory_item' component={ShowInventoryItem} />
      </Router>
    );
  }
}


export default withTracker(({id}) => {
  return {
    InventoryItems: InventoryItems.find().fetch(),
    currentUser: Meteor.user()
  };
})(App);