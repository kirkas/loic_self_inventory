import { Meteor } from 'meteor/meteor';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

import { Taggings } from '../imports/api/taggings.js';
import '../imports/api/inventory_items.js';
import '../imports/api/tags.js';
import {Images} from '../imports/api/images.js';
import {InventoryItems} from '../imports/api/inventory_items.js';

import Seed from './seed.js';
const fs = require('fs');

if (Meteor.isServer) {
  Meteor.startup(() => {
    Seed.populate()
  });
}