import { Meteor } from 'meteor/meteor';

import { Taggings } from '../imports/api/taggings.js';
import '../imports/api/inventory_items.js';
import '../imports/api/tags.js';
import '../imports/api/images.js';

if (Meteor.isServer) {
  Meteor.startup(() => {

  });
}