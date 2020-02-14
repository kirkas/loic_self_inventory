import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// import refresh from '/refresh.svg';
// import { Tags } from '../api/tags.js';

// InventoryItem component - represents a single todo item
export default class Header extends Component {
  refreshPage(){
    window.location.reload();
  }
  render() {
    return (
      <header className="Header">
        <h1 className="Header--title">
          <a className="Header--title--link" href="/#skipIntro">SelfInventory</a>
        </h1>
        <a href="#" className="Header--title--refresh" onClick={this.refreshPage}><img src="refresh.svg" alt="Refresh" /></a>
        <h2 className="Header--subtitle">of Loïc Dupasquier</h2>
      </header>
    );
  }
}