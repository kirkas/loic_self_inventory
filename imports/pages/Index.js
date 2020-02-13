import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';

// Data
import { InventoryItems } from '../api/inventory_items.js';

// UI
import InventoryItemCard from '../ui/InventoryItemCard.js';

// App component - represents the whole app
class Index extends Component {
  renderInventoryItems() {
    return this.props.InventoryItems.map((inventory_item) => (
      <InventoryItemCard
        key={inventory_item._id}
        InventoryItem={inventory_item}
        currentUser={this.props.currentUser}/>
    ));
  }

  animateText(){
    // var textWrapper = document.querySelector('.js-text');
    // textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline()
      .add({
        targets: '.js-text .js-word',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 300,
        delay: (el, i) => 200 * (i+1)
      }).add({
        targets: '.js-text .js-word',
        opacity: [1, 0],
        easing: "easeInOutQuad",
        duration: 300,
        delay: 1000
      }).add({
        targets: '.js-items',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 300,
        delay: 400
      })
  }

  componentDidMount() {
    this.animateText()
  }

  render() {
    return (
      <div className="container">
        <div className="Index--text js-text">
          <span className="js-word">la</span>
          <span className="js-word"> mise</span>
          <span className="js-word"> en</span>
          <span className="js-word"> place</span>
          <span className="js-word"> de</span>
          <span className="js-word"> cet</span>
          <span className="js-word"> index</span>
          <span className="js-word"> m'a</span>
          <span className="js-word"> donc</span>
          <span className="js-word"> permis</span>
          <span className="js-word"> de</span>
          <span className="js-word"> redécouvrir</span>
          <span className="js-word"> mon</span>
          <span className="js-word"> cheminement</span>
          <span className="js-word"> des</span>
          <span className="js-word"> 10</span>
          <span className="js-word"> dernirèes</span>
          <span className="js-word"> année</span>
          <span className="js-word"> et</span>
          <span className="js-word"> offre</span>
          <span className="js-word"> au</span>
          <span className="js-word"> visiteur</span>
          <span className="js-word"> un</span>
          <span className="js-word"> voyage</span>
          <span className="js-word"> ludique</span>
          <span className="js-word"> dans</span>
          <span className="js-word"> dans</span>
          <span className="js-word"> ma</span>
          <span className="js-word"> culture</span>
          <span className="js-word"> personnelle</span>
        </div>
        <div className="Index--items js-items">
          <ul className="inventoryItemsContainer">
            {this.renderInventoryItems()}
          </ul>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    InventoryItems: InventoryItems.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(Index);


