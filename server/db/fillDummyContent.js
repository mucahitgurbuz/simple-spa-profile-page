import User from "./../models/user";
import Photo from "./../models/photo";
import Experience from "../models/experience";
import Education from "../models/education";
import Publication from "../models/publication";

const dummyUsers = require("./dummyUsers.js");
const dummyExperiences = require("./dummyExperiences.js");
const dummyEducations = require("./dummyEducations.js");
const dummyPublications = require("./dummyPublications.js");

module.exports = function(db, callback) {
  Promise.all(
    dummyUsers.map(dummyUser => User.create(dummyUser, { include: [Photo] }))
  ).then(() => {
    Promise.all(
      dummyExperiences.map(dummyExperience =>
        Experience.create(dummyExperience)
      )
    ).then(() => {
      Promise.all(
        dummyEducations.map(dummyEducation => Education.create(dummyEducation))
      ).then(() => {
        Promise.all(
          dummyPublications.map(dummyPublication =>
            Publication.create(dummyPublication)
          )
        ).then(() => {
          callback();
        });
      });
    });
  });
};
