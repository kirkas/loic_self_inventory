import { Mongo } from 'meteor/mongo';
import { Taggings } from './taggings.js';

export const InventoryItems = new Mongo.Collection('InventoryItems');

import SimpleSchema from 'simpl-schema';

InventoryItems.schema = new SimpleSchema({
  title: {type: String},
  author: {type: String},
  description: {type: String},
  slug: {type: String},
  editor: {type: String},
  editor_url: {type: String, regEx: SimpleSchema.RegEx.Url},
  year: {type: Number},
  category: {type: String},
  size: {type: String},
  favorite: { type: Boolean, defaultValue: false },
  image_url: {type: String}
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
  }
});