import User from './../models/user';
import Photo from './../models/photo';

const dummyUsers = require('./dummyUsers.js');

module.exports = function(db, callback) {
  
  Promise.all(dummyUsers.map(dummyUser => User.create(dummyUser, { include: [Photo] }))).then(() => {
    callback();
  });
};
