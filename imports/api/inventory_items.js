import { Mongo } from 'meteor/mongo';
import { Taggings } from './taggings.js';
import { Images } from './images.js';

export const InventoryItems = new Mongo.Collection('InventoryItems');

import SimpleSchema from 'simpl-schema';

InventoryItems.schema = new SimpleSchema({
  title: {type: String},
  description: {type: String},
  slug: {type: String},
  editor: {type: String},
  editor_url: {type: String, regEx: SimpleSchema.RegEx.Url},
  year: {type: Number},
  favorite: { type: Boolean, defaultValue: false },
  imageId: {type: String, regEx: SimpleSchema.RegEx.Id}
});

// Slug system
InventoryItems.friendlySlugs(
  {
    slugFrom: 'title',
    slugField: 'slug',
    distinct: true
  }
);

InventoryItems.helpers({
  taggings() {
    taggings = Taggings.find({inventoryItemId: this._id}).fetch();
    return taggings;
  },

  image() {
    return Images.findOne({_id: this.imageId});
  }
});