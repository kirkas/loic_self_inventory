import { Mongo } from 'meteor/mongo';
export const Tags = new Mongo.Collection('tags');
import SimpleSchema from 'simpl-schema';

Tags.schema = new SimpleSchema({
  title: {type: String}
});


// TODO: Is this the correct way to extend?
Tags.findOrCreateTagByTitle = function(tag_title) {
  var tag = Tags.findOne({title: tag_title})
  // Create new tag
  if(tag == undefined) {
    Tags.insert({title: tag_title})
    tag = Tags.findOne({title: tag_title})
  }

  // Return the tag
  return tag;
}

