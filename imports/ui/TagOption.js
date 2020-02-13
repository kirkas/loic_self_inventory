import React, { Component } from 'react';
import ReactDOM from 'react-dom';


// InventoryItem component - represents a single todo item
export default class TagOption extends Component {
  render() {
    return (
      <option value={this.props.tag.title}>{this.props.tag.title}</option>
    );
  }
}