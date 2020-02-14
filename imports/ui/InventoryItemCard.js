import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Tagging from './Tagging.js';
import { Taggings } from '../api/taggings.js';
import { InventoryItems } from '../api/inventory_items.js';
import { Images } from '../api/images.js';
// import { Tags } from '../api/tags.js';

// InventoryItem component - represents a single todo item
export default class InventoryItemCard extends Component {
  render() {
    return (
      <a className="InventoryItemCard" href={this.props.InventoryItem.slug}>
        {this.props.InventoryItem.image() ? <img className="InventoryItemCard--image" src={this.props.InventoryItem.image().link()}/> : ''}
        <br/>
        <h3 className="InventoryItemCard--title">
          {this.props.InventoryItem.author ? <p>{this.props.InventoryItem.author}</p> : ''}
          {this.props.InventoryItem.title ? <p>{this.props.InventoryItem.title}</p> : ''}
        </h3>
      </a>
    );
  }
}