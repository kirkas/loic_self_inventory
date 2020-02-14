import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Tagging from './Tagging.js';
import Form from './Form.js';
import { Taggings } from '../api/taggings.js';
import { InventoryItems } from '../api/inventory_items.js';
import { Images } from '../api/images.js';
import { Router, Route, Link, useParams } from 'react-router';
// import { Tags } from '../api/tags.js';

// InventoryItem component - represents a single todo item
export default class InventoryItemTableRow extends Component {

  renderTags() {
    var taggings = this.props.InventoryItem.taggings()
    return taggings.map((tagging) => (
      <Tagging
        key={tagging._id}
        tagging={tagging}
        currentUser={this.props.currentUser}
        showDeleteButton={true}/>
    ));
  }

  editLink() {
    return "admin/"+this.props.InventoryItem.slug
  }

  deleteInventoryItem() {
    Images.remove(this.props.InventoryItem.imageId);
    // Taggings.remove({InventoryItemId: this.props.InventoryItem._id});
    InventoryItems.remove(this.props.InventoryItem._id);
  }

  render() {
    // Only for admin
    if (!this.props.currentUser) { return; }

    return (
      <tr className="InventoryItemTableRow">
        <td>
          {this.props.InventoryItem.image() ? <img className="InventoryItemTableRow--image" src={this.props.InventoryItem.image().link()}/> : ''}
        </td>
        <td>{this.props.InventoryItem.title}</td>
        <td>{this.props.InventoryItem.description}</td>
        <td>{this.renderTags()}</td>
        <td><a href="#" onClick={this.deleteInventoryItem.bind(this)}>Remove</a></td>
        <td>
          <a href={this.editLink()} >Edit</a>
        </td>

      </tr>
    );
  }
}