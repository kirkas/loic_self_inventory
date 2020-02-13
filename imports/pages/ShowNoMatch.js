import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// Data
import { InventoryItems } from '../api/inventory_items.js';
import { Taggings } from '../api/taggings.js';

// UI
import InventoryItemLarge from '../ui/InventoryItemLarge.js';
import Header from '../ui/Header.js';
import Tagging from '../ui/Tagging.js';

// App component - represents the whole app
class ShowNowMatch extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div>Welcome to the void</div>
      </div>
    )
  }
}

export default withTracker(({id}) => {
  return {
    InventoryItems: InventoryItems.find().fetch(),
    Taggings: Taggings.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(ShowNowMatch);