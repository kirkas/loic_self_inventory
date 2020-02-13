import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// Data
import { InventoryItems } from '../api/inventory_items.js';
import { Taggings } from '../api/taggings.js';

// UI
import InventoryItemLarge from '../ui/InventoryItemLarge.js';
import Tagging from '../ui/Tagging.js';

// App component - represents the whole app
class ShowInventoryItem extends Component {
  render() {
    let iv = InventoryItems.findOne({slug: this.props.match.params.inventory_item})
    if(!iv) {
      return null
    } else {
      return (
        <div className="container">
          <InventoryItemLarge
            key={iv._id}
            InventoryItem={iv}
            currentUser={this.props.currentUser}/>
        </div>
      );
    }
  }
}

export default withTracker(({id}) => {
  return {
    InventoryItems: InventoryItems.find().fetch(),
    Taggings: Taggings.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(ShowInventoryItem);