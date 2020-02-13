import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// import Tagging from './Tagging.js';
import { Taggings } from '../api/taggings.js';
import { InventoryItems } from '../api/inventory_items.js';
// import { Images } from '../api/images.js';
import Tagging from './Tagging.js';

// InventoryItem component - represents a single todo item
export default class InventoryItemLarge extends Component {
  renderTags(inventoryItem) {
    var taggings = inventoryItem.taggings()
    return taggings.map((tagging) => (
      <Tagging
        key={tagging._id}
        tagging={tagging}
        currentUser={this.props.currentUser}
        showDeleteButton={false}/>
    ));
  }

  renderEditor(inventoryItem) {
    if(inventoryItem.editor != undefined && inventoryItem.editor_url != undefined) {
      return (
        <span className="InventoryItem--editor"><a href={inventoryItem.editor_url}>{inventoryItem.editor}</a></span>
      )
    } else if (inventoryItem.editor != undefined) {
      return(
        <span className="InventoryItem--editor">{inventoryItem.editor}</span>
      )

    } else if (inventoryItem.editor_url != undefined) {
      return (
        <span className="InventoryItem--editor"><a href={inventoryItem.editor_url}>{inventoryItem.editor_url}</a></span>
      )
    }
  }


  render() {
    let metadata = [this.props.InventoryItem.category, this.props.InventoryItem.size, this.props.InventoryItem.year];
    let metadataText = metadata.filter(function (el) {
      return el != null;
    }).join(", ");
    console.log(metadataText)
    return (
      <div className="InventoryItemLarge">
        <img className="InventoryItemLarge--image" src={this.props.InventoryItem.image().link()}/>
        <div className="InventoryItemLarge--content">
          <div className="InventoryItemLarge--titleWrapper">
            <h3 className="InventoryItemLarge--title">{this.props.InventoryItem.title}</h3>
            <h4 className="InventoryItemLarge--metadata">
              {metadataText ? metadataText : ''}
            </h4>
          </div>
          <div className="InventoryItemLarge--textWrapper">
            <p className="InventoryItemLarge--description">{this.props.InventoryItem.description}</p>
            <div className="InventoryItemLarge--tagsWrapper">{this.renderTags(this.props.InventoryItem)}</div>
          </div>
        </div>
      </div>
    );
  }
}