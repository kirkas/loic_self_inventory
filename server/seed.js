import { Meteor } from 'meteor/meteor';


import { Taggings } from '../imports/api/taggings.js';
import '../imports/api/inventory_items.js';
import '../imports/api/tags.js';
import {Images} from '../imports/api/images.js';
import {InventoryItems} from '../imports/api/inventory_items.js';

const fs = require('fs');



//       wise not to rely on analytics presence (e.g: callback)
export default class Seed {

  // # Track a page
  // Doc: https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track
  static populate() {
    if (Meteor.isServer) {
      var base = process.env.PWD;
      var file = base+'/public/loic_self_inventory_records.csv';
      var content = fs.readFileSync(file, "utf8");


      CSV.readCsvFileLineByLine(file, Meteor.bindEnvironment(function (line, index, rawParsedLine) {
        // console.log(rawParsedLine)

        let lineNumber = line[0]
        let author = line[1]
        if(author == 'Artiste') {return }

        let title = line[2]

        let editor = line[3]
        let size = line[4]
        let year = line[6]
        let imageName = line[7]
        let imagePath = "http://loicdupasquier.com/selfinventory/"+imageName+".jpg"

        let payload = {
          author: author.trim(),
          year: parseInt(year),
          title: title.trim(),
          size: size.trim(),
          editor: editor.trim(),
          category: 'Record'.trim(),
          updatedAt: new Date(),
        }

        if(imageName) {
          let imageInsert = Images.load(imagePath, {
            fileName: imageName+'.jpg'
          }, function(error, fileRef){
            if (!error) {
              let inventory_item = InventoryItems.findOne({title: payload.title})
              if(inventory_item && inventory_item.imageId) {
                payload.imageId = fileRef._id
              }
              if(inventory_item) {
                let inventory_item_id = inventory_item._id
                let success = InventoryItems.update(inventory_item_id, { $set: payload })
              } else {
                payload.createdAt = new Date()
                let inventory_item_id = InventoryItems.insert(payload)
              }
            }
          });
        }
      }));
    }
  }
}