import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// Data
import { InventoryItems } from '../api/inventory_items.js';
import { Taggings } from '../api/taggings.js';

// UI
import Form from '../ui/Form.js';
import Header from '../ui/Header.js';
import InventoryItemTable from '../ui/InventoryItemTable.js';
import AccountsUIWrapper from '../ui/AccountsUIWrapper.js';

// App component - represents the whole app
class AdminShowInventory extends Component {
  render() {
    let iv = InventoryItems.findOne({slug: this.props.match.params.inventory_item})
    if(!iv) {
      return null
    } else {
      return (

        <div className="container">
          <Header />
          <hr/>
          <h1>Admin / Edit {iv.title}</h1>
          <hr/>
          <Form InventoryItem={iv}/>
        </div>
      );
    }
  }
}

export default withTracker(() => {
  return {
    InventoryItems: InventoryItems.find({}).fetch(),
    Taggings: Taggings.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(AdminShowInventory);