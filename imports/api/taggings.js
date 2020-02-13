import { Mongo } from 'meteor/mongo';
export const Taggings = new Mongo.Collection('taggings');
import { Tags } from './tags.js';
import SimpleSchema from 'simpl-schema';

Taggings.schema = new SimpleSchema({
  inventoryItemId: {type: String, regEx: SimpleSchema.RegEx.Id},
  tagId: {type: String, regEx: SimpleSchema.RegEx.Id}
});

Taggings.helpers({
  tag() {
    return Tags.findOne({_id: this.tagId})
  }
});

// TODO: Is this the correct way to extend?
Taggings.findOrCreateTagging = function(inventory_item_id, tag_id) {
  var tagging = Taggings.findOne({inventoryItemId: inventory_item_id, tagId: tag_id})
  // Create new tag
  if(tagging == undefined) {
    Taggings.insert({inventoryItemId: inventory_item_id, tagId: tag_id})
    tagging = Taggings.findOne({inventoryItemId: inventory_item_id, tagId: tag_id})
  }

  // Return the tagging
  return tagging;
}