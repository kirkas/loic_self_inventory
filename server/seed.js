import { Meteor } from 'meteor/meteor';

import {InventoryItems} from '../imports/api/inventory_items.js';

const fs = require('fs');

const request = require('request');

export default class Seed {

  static populate() {
    if (Meteor.isServer) {
      var base = process.env.PWD;
      request('https://www.dropbox.com/s/fm1y1a9dp7wufpu/loic_self_inventory.csv?raw=1', Meteor.bindEnvironment(function (error, response, body) {
        let rows = CSV.parse(body).data
        let i;
        for (i = 0; i < rows.length; i++) {
          let line = rows[i]

          let lineNumber = line[0]
          let author = line[1]
          if(author != 'Artiste') {

            let title = line[2]
            let editor = line[3]
            let size = line[4]
            let year = line[6]
            let imageName = line[7]
            let imageUrl = "http://loicdupasquier.com/selfinventory/"+imageName+".jpg"

            let payload = {
              author: author.trim(),
              year: parseInt(year),
              title: title.trim(),
              size: size.trim(),
              editor: editor.trim(),
              category: 'Record'.trim(),
              updatedAt: new Date(),
              image_url: imageUrl
            }

            let inventory_item = InventoryItems.findOne({title: payload.title})

            if(inventory_item) {
              let inventory_item_id = inventory_item._id
              let success = InventoryItems.update(inventory_item_id, { $set: payload })
            } else {
              payload.createdAt = new Date()
              let inventory_item_id = InventoryItems.insert(payload)
            }
          }
        }
      }));
    }
  }
}