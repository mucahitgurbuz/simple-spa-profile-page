const dummyUsers = require('./dummyUsers.js');

module.exports = function(db, callback) {
  Promise.all(dummyUsers.map(dummyUser => db.user.create(dummyUser, { include: [db.photo] }))).then(() => {
    callback();
  });
};
