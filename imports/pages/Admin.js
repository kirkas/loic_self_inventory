import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// Data
import { InventoryItems } from '../api/inventory_items.js';
import { Taggings } from '../api/taggings.js';

// UI
import Form from '../ui/Form.js';
import InventoryItemTable from '../ui/InventoryItemTable.js';
import AccountsUIWrapper from '../ui/AccountsUIWrapper.js';

// App component - represents the whole app
class Admin extends Component {
  render() {
    return (
      <div className="container">
        <hr/>
        <h1>Admin &middot; <AccountsUIWrapper /></h1>
        <hr/>
        { this.props.currentUser ?
          <div>
          <InventoryItemTable
            InventoryItems={this.props.InventoryItems}
            currentUser={this.props.currentUser}/>
          </div>

        : 'Nothing to see here'}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    InventoryItems: InventoryItems.find({}).fetch(),
    Taggings: Taggings.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(Admin);