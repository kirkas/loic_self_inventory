import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import InventoryItemTableRow from './InventoryItemTableRow.js';

// import { Tags } from '../api/tags.js';

// InventoryItem component - represents a single todo item
export default class InventoryItemTable extends Component {
  renderInventoryItemTableRow() {
    return this.props.InventoryItems.map((inventory_item) => (
      <InventoryItemTableRow
        key={inventory_item._id}
        InventoryItem={inventory_item}
        currentUser={this.props.currentUser}/>
    ));
  }


  render() {
    return (
      <table className="InventoryItemTable">
        <thead>
        </thead>
        <tbody>
        {this.renderInventoryItemTableRow()}
        </tbody>
      </table>
    );
  }
}