// React import
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Plugin
require('selectize');

// Api methods
import { InventoryItems } from '../api/inventory_items.js';
import { Taggings } from '../api/taggings.js';
import { Tags } from '../api/tags.js';

import TagOption from './TagOption.js';

// InventoryItem component - represents a single todo item
export default class Form extends Component {

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.description).value.trim();
    const editor = ReactDOM.findDOMNode(this.refs.editor).value.trim();
    const editorUrl = ReactDOM.findDOMNode(this.refs.editor_url).value.trim();
    const year = ReactDOM.findDOMNode(this.refs.year).value.trim();
    const category = ReactDOM.findDOMNode(this.refs.category).value.trim();
    const size = ReactDOM.findDOMNode(this.refs.size).value.trim();
    const author = ReactDOM.findDOMNode(this.refs.author).value.trim();
    const imageUrl = ReactDOM.findDOMNode(this.refs.image_url).value.trim();

    const favorite  = ReactDOM.findDOMNode(this.refs.favorite).checked;
    const tags_titles = this.selectize.getValue();



    // 1. Create new tags
    var tags = []
    for (var i = 0; i < tags_titles.length; i++) {
      var tag_title = tags_titles[i].trim()
      var tag = Tags.findOrCreateTagByTitle(tag_title)
      tags.push(tag);
    }

    // 3. Save or update the InventoryItem
    let inventory_item_id;
    let payload = {
      title: title,
      description: description,
      editor: editor,
      editor_url: editorUrl,
      favorite: favorite,
      updatedAt: new Date(),
      year: year,
      category: category,
      author: author,
      size: size,
      image_url: imageUrl
    }


    if(this.props.InventoryItem) {
      inventory_item_id = this.props.InventoryItem._id
      let success = InventoryItems.update(inventory_item_id, { $set: payload })
      if(success == 1) {
        this.showSuccess()
      }
    } else {
      payload.createdAt = new Date()
      inventory_item_id = InventoryItems.insert(payload)
    }

    // 4. Delete existing taggings
    if(this.props.InventoryItem) {
      this.props.InventoryItem.taggings().forEach(function(tagging) {
        Taggings.remove(tagging._id);
      });
    }

    // 5. Create (new) taggings
    for (var i = 0; i < tags.length; i++) {
      let tagging = Taggings.findOrCreateTagging(inventory_item_id, tags[i]._id)
    }

    // Clear form
    if(!this.props.InventoryItem && inventory_item_id.length > 0) {
      this.showSuccess();
      ReactDOM.findDOMNode(this.refs.title).value = '';
      ReactDOM.findDOMNode(this.refs.description).value = '';
      ReactDOM.findDOMNode(this.refs.editor).value = '';
      ReactDOM.findDOMNode(this.refs.editor_url).value = '';
      ReactDOM.findDOMNode(this.refs.year).value = '';
      ReactDOM.findDOMNode(this.refs.category).value = '';
      ReactDOM.findDOMNode(this.refs.size).value = '';
      ReactDOM.findDOMNode(this.refs.favorite).checked = false;
      ReactDOM.findDOMNode(this.refs.image_url).value = '';
      this.selectize.clear()
    }
  }

  componentDidMount() {
    $('select').selectize({
      create: function(input) {
        return { value: input, text: input }
      }
    });
    this.selectize = $('select')[0].selectize;
  }


  componentDidUpdate() {
    $('select').selectize({
      create: function(input) {
        return { value: input, text: input }
      }
    });
    this.selectize = $('select')[0].selectize;
  }

  renderOptions() {
    var tags = Tags.find().fetch()
    return tags.map((tag) => (
      <TagOption key={tag._id} tag={tag} />
    ));
  }

  showSuccess() {
    console.log("success");
    $('.js-success-message').slideDown()
    setTimeout(function(){
      $('.js-success-message').slideUp()
    }, 3000);
  }

  render() {

    // Existing values
    let titleValue = this.props.InventoryItem ? this.props.InventoryItem.title : ''
    let descriptionValue = this.props.InventoryItem ? this.props.InventoryItem.description : ''
    let editorValue = this.props.InventoryItem ? this.props.InventoryItem.editor : ''
    let editorUrlValue = this.props.InventoryItem ? this.props.InventoryItem.editor_url : ''
    let favoriteChecked = this.props.InventoryItem ? this.props.InventoryItem.favorite : false

    let yearValue = this.props.InventoryItem ? this.props.InventoryItem.year : ''
    let categoryValue = this.props.InventoryItem ? this.props.InventoryItem.category : ''
    let sizeValue = this.props.InventoryItem ? this.props.InventoryItem.size : ''
    let authorValue  = this.props.InventoryItem ? this.props.InventoryItem.author : ''
    let tagsValue = ['']
    if (this.props.InventoryItem != undefined) {
       tagsValue = this.props.InventoryItem.taggings().map((tagging) => (
         tagging.tag().title
       ))
    }
    let image = this.props.InventoryItem ? <img className="Form--image" src={this.props.InventoryItem.image_url}/> : ''

    return (
      <form className="Form" onSubmit={this.handleSubmit.bind(this)} >
        <div className="success-message u-displayNone js-success-message">
          Successfully
          {this.props.InventoryItem ? ' Updated' : ' Saved'}
        </div>
        <div className="c-input-group">
          <label className="c-label">Title</label>
          <input
            className="c-input"
            type="text"
            ref="title"
            placeholder="Title"
            required="required"
            defaultValue={titleValue}/>
        </div>
        <div className="c-input-group">
          <label className="c-label">Author/artist</label>
          <input
            className="c-input"
            type="text"
            ref="author"
            placeholder="Author/artist"
            defaultValue={authorValue}/>
        </div>
        <div className="c-input-group">
          <label className="c-label">Description</label>
          <input
            className="c-input"
            type="text"
            ref="description"
            placeholder="Description"
            defaultValue={descriptionValue}/>
        </div>
        <div className="c-input-group">
          <label className="c-label">Editor</label>
          <input
            className="c-input"
            type="text"
            ref="editor"
            placeholder="Editor"
            defaultValue={editorValue}/>
        </div>
        <div className="c-input-group">
          <label className="c-label">Editor URL</label>
          <input
            className="c-input"
            type="url"
            ref="editor_url"
            placeholder="Editor URL"
            defaultValue={editorUrlValue}/>
        </div>
        <div className="c-input-group">
          <label className="c-label">Year</label>
          <input
            className="c-input"
            type="number"
            min="1800"
            max="2030"
            ref="year"
            placeholder="Year"
            defaultValue={yearValue}/>
        </div>
        <div className="c-input-group">
          <label className="c-label">Category</label>
          <input
            className="c-input"
            type="text"
            ref="category"
            placeholder="Category"
            defaultValue={categoryValue}/>
        </div>
        <div className="c-input-group">
          <label className="c-label">Size</label>
          <input
            className="c-input"
            type="text"
            ref="size"
            placeholder="Size"
            defaultValue={sizeValue}/>
        </div>
        <div className="c-input-group">
          <label className="c-label">
            <input
              type="checkbox"
              ref="favorite"
              defaultChecked={favoriteChecked}/>
            Favorite
          </label>
        </div>
        <div className="c-input-group">
          <label className="c-label">Tags</label>
          <select
            className="c-input"
            multiple="multiple"
            type="text"
            ref="tags"
            placeholder="Tags"
            defaultValue={tagsValue}>
            {this.renderOptions()}
          </select>
        </div>
        <div className="c-input-group">
          <label className="c-label">Image URL</label>
          {image}
          <input
            className="c-input"
            type="text"
            ref="image_url"
            placeholder="Size"
            defaultValue={imageUrlValue}/>
        </div>
        <button type="submit" className="c-button">{this.props.InventoryItem ? 'update' : 'Add'}</button>
      </form>
    );
  }
}
