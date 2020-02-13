import { Request, Response } from "express";
import User from "./../../models/user";
import Experience from "./../../models/experience";
import Company from "./../../models/company";
import Education from "./../../models/education";
import Skill from "./../../models/skill";
import Endorsement from "../../models/endorsement";
import Publication from "../../models/publication";
import Award from "../../models/award";
import Interest from "../../models/interest";

export default async (req: Request & { user: User }, res: Response) => {
  let response = req.user;
  Experience.findAll({
    where: { ofId: 1 },
    include: [{ model: Company }]
  }).then(experiences => {
    response.dataValues.experiences = experiences;

    Education.findAll({
      where: { ofId: 1 }
    }).then(educations => {
      response.dataValues.educations = educations;

      Skill.findAll({
        where: { ofId: 1 },
        include: [{ model: Endorsement, include: [{ model: User }] }]
      }).then(skills => {
        response.dataValues.skills = skills;

        Publication.findAll({
          where: { ofId: 1 }
        }).then(publications => {
          response.dataValues.publications = publications;

          Award.findAll({
            where: { ofId: 1 }
          }).then(awards => {
            response.dataValues.awards = awards;

            Interest.findAll({
              where: { ofId: 1 }
            }).then(interests => {
              response.dataValues.interests = interests;

              res.status(200).json({
                status: true,
                content: response
              });
            });
          });
        });
      });
    });
  });
};
