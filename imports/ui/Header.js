import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';


// import { Tags } from '../api/tags.js';

// InventoryItem component - represents a single todo item
export default class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1 className="Header--title">
          <a className="Header--title--link" href="/">SelfInventory</a>
        </h1>
        <h2 className="Header--subtitle">of Loïc Dupasquier</h2>
      </header>
    );
  }
}