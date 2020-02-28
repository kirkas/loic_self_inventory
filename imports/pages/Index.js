import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';


import { withTracker } from 'meteor/react-meteor-data';

// Data
import { InventoryItems } from '../api/inventory_items.js';

// UI
import InventoryItemCard from '../ui/InventoryItemCard.js';

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// App component - represents the whole app
class Index extends Component {

  renderInventoryItems() {

    const shuffledPosts = shuffleArray(this.props.InventoryItems)
    return shuffledPosts.map((inventory_item) => (

      <InventoryItemCard
        key={inventory_item._id}
        InventoryItem={inventory_item}
        currentUser={this.props.currentUser}/>
    ));
  }

  animateText(){
    if(window.location.hash == '#skipIntro') {
      $('.js-text').remove()
      // $('.js-items').css({opacity: 1})
       anime.timeline().add({
         targets: '.js-items',
         opacity: [0, 1],
         easing: "easeInOutQuad",
         duration: 1000,
         complete: function() {
           $('.js-text').remove()
         }
       })
    } else {
      $('Header').css({opacity: 0})
      $('.js-phrase').hide()
      $('.js-phrase-1').hide()
      let timeline = anime.timeline()
      $('.js-phrase').each(function(index){
        let $phrase = $(this)
        timeline.add({
          targets: $phrase.data("class"),
          opacity: [0,1],
          easing: "easeInOutQuad",
          duration: 500,
          begin: function(){
            $phrase.show()
          }
        }).add({
          targets: $phrase.data("class") + " .js-word",
          opacity: [0,1],
          easing: "easeInOutQuad",
          duration: 300,
          delay: (el, i) => 200 * (i+1)
        }).add({
          targets: $phrase.data("class"),
          opacity: [1,0],
          easing: "easeInOutQuad",
          duration: 300,
          delay: 2000,
          complete: function(){
            $phrase.hide()
          }
        })
      });
      timeline.add({
          targets: '.Header',
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: 300,
          delay: 400
        }).add({
          targets: '.js-items',
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: 300,
          delay: 400,
          complete: function() {
            window.location.hash = "skipIntro"
            $('.js-text').remove()
          }
        })
      }
  }

  componentDidMount() {
    this.animateText()

  }

  render() {
    return (
      <div className="container">
        <div className="Index--text js-text">
          <p className="Index--phrase js-phrase js-phrase-0" data-class=".js-phrase-0">
            SelfInventory
          </p>
          <p className="Index--phrase js-phrase js-phrase-1" data-class=".js-phrase-1">
            <span className="js-word">Tout</span><span className="js-word"> part</span><span className="js-word"> de</span><span className="js-word"> l’accident</span><span className="js-word"> dont</span><span className="js-word"> je</span><span className="js-word"> fus</span><span className="js-word"> victime</span><span className="js-word"> le</span><span className="js-word"> 2</span><span className="js-word"> juin</span><span className="js-word"> 2017.</span><br/><br/><span className="js-word"> L’accident</span><span className="js-word"> qui</span><span className="js-word"> m'a</span><span className="js-word"> vidé</span><span className="js-word"> d’une</span><span className="js-word"> partie</span><span className="js-word"> de</span><span className="js-word"> ma </span>
            <span className="Index--wordUnderlined js-word">culture personnelle</span>
            <span className="js-word"> </span><span className="js-word"> et</span><span className="js-word"> de</span><span className="js-word"> mes </span>
            <span className="js-word Index--wordUnderlined">souvenirs</span><span className="js-word">.</span>
          </p>
          <p className="Index--phrase js-phrase js-phrase-2" data-class=".js-phrase-2">
            <span className="js-word">Mon </span><span className="js-word">projet </span><span className="js-word">de </span><span className="js-word">mémoire </span><span className="js-word">fut </span><span className="js-word">l’opportunité </span><span className="js-word">de </span><span className="js-word Index--wordUnderlined">redécouvrir</span><span className="js-word"> mon </span><span className="js-word">passé, </span><span className="js-word">les </span><span className="js-word">cheminements </span><span className="js-word">et </span><span className="js-word">tous </span><span className="js-word">les </span><span className="js-word Index--wordUnderlined">univers</span><span className="js-word"> qui </span><span className="js-word">font </span><span className="js-word">ma </span><span className="js-word">personne. </span>
          </p>
          <p className="Index--phrase js-phrase js-phrase-3" data-class=".js-phrase-3">
            <span className="js-word Index--wordUnderlined">Inventorier</span><span className="js-word"> les </span><span className="js-word">objets </span><span className="js-word">culturels </span><span className="js-word">dont </span><span className="js-word">j’ai </span><span className="js-word">fait </span><span className="js-word">l’acquisition </span><span className="js-word">pendant </span><span className="js-word">les </span><span className="js-word">10 </span><span className="js-word">dernières </span><span className="js-word">années </span><span className="js-word">est </span><span className="js-word">ce </span><span className="js-word">qui </span><span className="js-word">m’a </span><span className="js-word">permis </span><span className="js-word">la </span><span className="js-word Index--wordUnderlined">reconstruction</span><span className="js-word"> de </span><span className="js-word">mon </span><span className="js-word Index--wordUnderlined">patrimoine culturel</span><span className="js-word">.</span>
          </p>
          <p className="Index--phrase js-phrase js-phrase-4" data-class=".js-phrase-4">
            <span className="js-word">Le mémoire</span>
            <br/><br/>
            <span className="js-word">La mémoire</span>
          </p>
          <p className="Index--phrase js-phrase js-phrase-5" data-class=".js-phrase-5">
            <span className="js-word">Ce </span><span className="js-word">sont </span><span className="js-word">les </span><span className="js-word">termes </span><span className="js-word">qui </span><span className="js-word">définissent </span><span className="js-word">ce </span><span className="js-word">projet.</span>
          </p>
          <p className="Index--phrase js-phrase js-phrase-6" data-class=".js-phrase-6">
            <span className="js-word">Bienvenue </span><span className="js-word">et  </span><span className="js-word Index--wordUnderlined">bon voyage</span><span className="js-word"> dans </span><span className="js-word">mon </span><span className="js-word">univers</span>
          </p>
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


