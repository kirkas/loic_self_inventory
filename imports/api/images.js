import { FilesCollection } from 'meteor/ostrio:files';
export const Images = new FilesCollection({collectionName: 'Images'});


if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
} else {
  // Subscribe to file's collections on Client
  Meteor.subscribe('files.images.all');
}