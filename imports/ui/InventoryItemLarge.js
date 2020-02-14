import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// import Tagging from './Tagging.js';
import { Taggings } from '../api/taggings.js';
import { InventoryItems } from '../api/inventory_items.js';
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
    if(this.props.InventoryItem.editor != undefined && this.props.InventoryItem.editor_url != undefined) {
      return (
        <span className="InventoryItem--editor"><a href={this.props.InventoryItem.editor_url}>{this.props.InventoryItem.editor}</a></span>
      )
    } else if (this.props.InventoryItem.editor != undefined) {
      return(
        <span className="InventoryItem--editor">{this.props.InventoryItem.editor}</span>
      )

    } else if (this.props.InventoryItem.editor_url != undefined) {
      return (
        <span className="InventoryItem--editor"><a href={this.props.InventoryItem.editor_url}>{this.props.InventoryItem.editor_url}</a></span>
      )
    }
  }


  render() {
    let metadata = [
      this.props.InventoryItem.author,
      this.props.InventoryItem.category,
      this.props.InventoryItem.size,
      this.props.InventoryItem.year
    ];

    let metadataText = metadata.filter(function (el) {
      return el != null;
    }).join(", ");


    return (
      <div className="InventoryItemLarge">
        {this.props.InventoryItem.image_url ? <img className="InventoryItemLarge--image" src={this.props.InventoryItem.image_url}/> : ''}
        <div className="InventoryItemLarge--content">
          <div className="InventoryItemLarge--titleWrapper">
            <h3 className="InventoryItemLarge--title">{this.props.InventoryItem.title}</h3>
            <h4 className="InventoryItemLarge--metadata">
              {metadataText ? metadataText : ''}
              {metadataText && this.renderEditor() ? ', ' : ''}
              {this.renderEditor() ? this.renderEditor() : ''}
            </h4>
          </div>
          <div className="InventoryItemLarge--textWrapper">
            <p className="InventoryItemLarge--description">{this.props.InventoryItem.description}</p>
            <div className="InventoryItemLarge--tagsWrapper">
              Keywords:
              {this.renderTags(this.props.InventoryItem)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}