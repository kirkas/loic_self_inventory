import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';

// Data
import { InventoryItems } from '../api/inventory_items.js';

// UI
import InventoryItemCard from '../ui/InventoryItemCard.js';
import Header from '../ui/Header.js';


// App component - represents the whole app
class Index extends Component {
  renderInventoryItems() {
    return this.props.InventoryItems.map((inventory_item) => (
      <InventoryItemCard
        key={inventory_item._id}
        InventoryItem={inventory_item}
        currentUser={this.props.currentUser}/>
    ));
  }
  render() {
    return (
      <div className="container">
        <Header />
        <div>
          <ul className="inventoryItemsContainer">
            {this.renderInventoryItems()}
          </ul>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    InventoryItems: InventoryItems.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(Index);


