import User from "./../models/user";
import Photo from "./../models/photo";
import Experience from "../models/experience";
import Education from "../models/education";
import Publication from "../models/publication";
import Award from "../models/award";
import Interest from "../models/interest";
import Company from "../models/company";
import Skill from "../models/skill";
import Endorsement from "../models/endorsement";

const dummyUsers = require("./dummyUsers.js");
const dummyExperiences = require("./dummyExperiences.js");
const dummyEducations = require("./dummyEducations.js");
const dummyPublications = require("./dummyPublications.js");
const dummyAwards = require("./dummyAwards.js");
const dummyInterests = require("./dummyInterests.js");
const dummyCompanies = require("./dummyCompanies.js");
const dummySkills = require("./dummySkills.js");
const dummyEndorsements = require("./dummyEndorsements.js");

module.exports = function(db, callback) {
  Promise.all(
    dummyUsers.map(dummyUser => User.create(dummyUser, { include: [Photo] }))
  ).then(() => {
    Promise.all(
      dummyCompanies.map(dummyCompany => Company.create(dummyCompany))
    ).then(() => {
      Promise.all(
        dummyExperiences.map(dummyExperience =>
          Experience.create(dummyExperience)
        )
      ).then(() => {
        Promise.all(
          dummyEducations.map(dummyEducation =>
            Education.create(dummyEducation)
          )
        ).then(() => {
          Promise.all(
            dummyPublications.map(dummyPublication =>
              Publication.create(dummyPublication)
            )
          ).then(() => {
            Promise.all(
              dummyAwards.map(dummyAward => Award.create(dummyAward))
            ).then(() => {
              Promise.all(
                dummyInterests.map(dummyInterest =>
                  Interest.create(dummyInterest)
                )
              ).then(() => {
                Promise.all(
                  dummySkills.map(dummySkill => Skill.create(dummySkill))
                ).then(() => {
                  Promise.all(
                    dummyEndorsements.map(dummyEndorsement =>
                      Endorsement.create(dummyEndorsement)
                    )
                  ).then(() => {
                    callback();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};
