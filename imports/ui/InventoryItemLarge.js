
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
        <span className="InventoryItem--editor"><a href={this.props.InventoryItem.editor_url} target="_blank">{this.props.InventoryItem.editor}</a></span>
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

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  renderImage(id) {
    let it = InventoryItems.findOne({_id: id});
    return "<a href="+ it.slug+"><img class='InventoryItemLarge--floatingImage' src="+it.image_url+" ></a>";
  }

  renderRandomInventoryItem() {
    let it = this.props.InventoryItem
    let currentTaggings = this.props.InventoryItem.taggings()
    let tagsId = currentTaggings.map((tagging) => tagging.tagId)
    let relatedTaggings = tagsId.map((tagId) => Taggings.find({tagId: tagId}).fetch())

    let relatedInventoryItems =
      relatedTaggings.flat()
                     .map((tagging) => InventoryItems.findOne({_id: tagging.inventoryItemId}))
                     .filter((obj) => obj )

    let relatedInventoryItemByCount = {};
    $.each(relatedInventoryItems, function(index){
      let currentIt = relatedInventoryItems[index]
      let sameInventoryItem = currentIt._id == it._id
      if(!sameInventoryItem) {
        if(relatedInventoryItemByCount[currentIt._id]) {
          relatedInventoryItemByCount[currentIt._id]+=1
        } else {
          relatedInventoryItemByCount[currentIt._id] =1
        }
      }
    })

    var sortable = [];
    for (var _it in relatedInventoryItemByCount) {
      sortable.push([_it, relatedInventoryItemByCount[_it]]);
    }

    sortable = sortable.sort(function(a, b) {
      return b[1] - a[1];
    });

    sortable = sortable.concat(sortable)
    sortable = sortable.concat(sortable)
    sortable = sortable.concat(sortable)
    sortable = sortable.concat(sortable)

    let timeline = anime.timeline()
    let ri = this.renderImage
    let rn = this.getRandomArbitrary
    setTimeout(function() {
      $(".js-randomInventoryItem").css({opacity: 0})
      for (var oi in sortable) {
        let s = sortable[oi]
        timeline.add({
          targets: '.js-randomInventoryItem',
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: 5000,
          delay: 2000,
          begin: function() {
            console.log("BEGIN")
            $('.js-randomInventoryItem').html(ri(s[0]))
            let top = rn(10, window.innerHeight - $('.js-randomInventoryItem').height())
            let left = rn(10, window.innerWidth - $('.js-randomInventoryItem').width())
            $('.InventoryItemLarge--floatingImageContainer').css({top: top, left: left})
          }
        }).add({
          targets: '.js-randomInventoryItem',
          opacity: [1, 0],
          easing: "easeInOutQuad",
          duration: 2000,
          delay: 5000
        })
      }
    }, 1000)
  }

  render() {
    let metadata = [
      this.props.InventoryItem.author,
      this.props.InventoryItem.category,
      this.props.InventoryItem.size,
      this.props.InventoryItem.year
    ];

    let metadataText = metadata.filter(function (el) {
      return el != null && $.trim(el) != ""
    }).join(", ");

    // this.renderRandomInventoryItem();
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
            {this.props.InventoryItem.taggings().length ?
              <div className="InventoryItemLarge--tagsWrapper">
                <span className="InventoryItemLarge--keyword">Keywords</span>
                {this.renderTags(this.props.InventoryItem)}
              </div>
              : '' }
          </div>
        </div>
      </div>
    );
  }
}