import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronDown, faPen } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

import { inject, observer } from "mobx-react";
import { CommonStore } from "../store/commonStore";
import { UserStore } from "../store/userStore";

import ProfileModuleHeader from "./ProfileModuleHeader";

library.add(faPen, faChevronDown);

export interface ProfileModuleProps {
  type: string;
  addMore: boolean;
  editable: boolean;
  showMore: boolean;
  seeAll: boolean;
  commonStore?: CommonStore;
  userStore?: UserStore;
}

const ProfileModule = inject(
  "commonStore",
  "userStore"
)(
  observer(
    ({
      commonStore,
      userStore,
      type,
      addMore,
      editable,
      showMore,
      seeAll
    }: ProfileModuleProps) => {
      if (!userStore || !commonStore) {
        return null;
      }

      const {
        experiences,
        educations,
        skills,
        publications,
        awards,
        interests
      } = userStore.self!;

      const groupedExperiences = experiences.reduce((a, c) => {
        if (a.some((el: any) => el.companyId === c.companyId)) {
          a.forEach((e: any) => {
            if (e.companyId === c.companyId) {
              e.totalYear =
                e.totalYear +
                (c.finish
                  ? new Date(c.finish).getFullYear()
                  : new Date().getFullYear()) -
                new Date(c.start).getFullYear();
              e.positions.push({
                title: c.position,
                start: c.start,
                finish: c.finish ? c.finish : null,
                location: c.location,
                description: c.description
              });
            }
          });
          return a;
        } else {
          a.push({
            company: c.company.title,
            companyLogo: c.company.logo,
            companyId: c.companyId,
            totalYear:
              (c.finish
                ? new Date(c.finish).getFullYear()
                : new Date().getFullYear()) - new Date(c.start).getFullYear(),
            positions: [
              {
                title: c.position,
                start: c.start,
                finish: c.finish ? c.finish : null,
                description: c.description,
                location: c.location
              }
            ]
          });
          return a;
        }
      }, [] as any);

      const groupedEducations = educations.reduce((a: any, c: any) => {
        if (a.some((el: any) => el.institute === c.institute)) {
          a.forEach((e: any) => {
            if (e.institute === c.institute) {
              e.totalYear =
                e.totalYear +
                (c.finish
                  ? new Date(c.finish).getFullYear()
                  : new Date().getFullYear()) -
                new Date(c.start).getFullYear();
              e.degrees.push({
                title: c.degree,
                start: c.start,
                department: c.department,
                gpa: c.gpa,
                finish: c.finish ? c.finish : null,
                description: c.description
              });
            }
          });
          return a;
        } else {
          a.push({
            institute: c.institute,
            logo: c.logo,
            totalYear:
              (c.finish
                ? new Date(c.finish).getFullYear()
                : new Date().getFullYear()) - new Date(c.start).getFullYear(),
            degrees: [
              {
                title: c.degree,
                start: c.start,
                finish: c.finish ? c.finish : null,
                description: c.description,
                department: c.department,
                gpa: c.gpa
              }
            ]
          });
          return a;
        }
      }, [] as any);

      const accomplishements = [
        { title: "Publications", contents: publications },
        { title: "Awards", contents: awards }
      ];

      const groupedSkills = skills.map((skill: any) => {
        return {
          title: skill.title,
          endorsedBy: skill.endorsements.map((endorsement: any) => {
            return {
              name: endorsement.endorsedUser.displayName,
              picture: endorsement.endorsedUser.photo.thumbnailUrl,
              isColleague: true
            };
          })
        };
      });

      return (
        <div className="profile__module">
          {(() => {
            switch (type) {
              case "experience":
                return (
                  <React.Fragment>
                    <ProfileModuleHeader
                      type={type}
                      title="Experience"
                      addMore={true}
                    />
                    {groupedExperiences.map((e: any) =>
                      e.positions.length > 1 ? (
                        <div className="profile__module-content">
                          <div className="profile__module-content-group-header">
                            <div className="profile__module-content-logo">
                              {e.companyLogo ? (
                                <img src={e.companyLogo} />
                              ) : null}
                            </div>
                            <div className="profile__module-content-info">
                              <div className="profile__module-content-title">
                                {e.company}
                              </div>
                              <div className="profile__module-content-subtitle">
                                {e.totalYear} years
                              </div>
                            </div>
                          </div>
                          {e.positions.map((pos: any) => (
                            <div className="profile__module-content-position">
                              <div className="profile__module-content-title">
                                <span>{pos.title}</span>
                                {editable ? (
                                  <button className="profile__module-content-edit">
                                    <FontAwesomeIcon icon="pen" />
                                  </button>
                                ) : null}
                              </div>

                              <div className="profile__module-content-time">
                                {new Date(pos.start).getFullYear()} -{" "}
                                {pos.finish !== null
                                  ? new Date(pos.finish).getFullYear()
                                  : "Present"}
                              </div>
                              <div className="profile__module-content-location">
                                {pos.location}
                              </div>
                              <div className="profile__module-content-description">
                                {pos.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="profile__module-content">
                          <div className="profile__module-content-logo">
                            {e.companyLogo ? <img src={e.companyLogo} /> : null}
                          </div>
                          <div className="profile__module-content-info">
                            <div className="profile__module-content-title">
                              <span>{e.positions[0].title}</span>
                              {editable ? (
                                <button className="profile__module-content-edit">
                                  <FontAwesomeIcon icon="pen" />
                                </button>
                              ) : null}
                            </div>
                            <div className="profile__module-content-subtitle">
                              {e.company}
                            </div>
                            <div className="profile__module-content-time">
                              {new Date(e.positions[0].start).getFullYear()} -{" "}
                              {e.positions[0].finish !== null
                                ? new Date(e.positions[0].finish).getFullYear()
                                : "Present"}
                            </div>
                            <div className="profile__module-content-location">
                              {e.location}
                            </div>
                            <div className="profile__module-content-description">
                              {e.positions[0].description}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </React.Fragment>
                );
              case "education":
                return (
                  <React.Fragment>
                    <ProfileModuleHeader
                      type={type}
                      title="Education"
                      addMore={true}
                    />
                    {groupedEducations.map((e: any) =>
                      e.degrees.length > 1 ? (
                        <div className="profile__module-content">
                          <div className="profile__module-content-group-header">
                            <div className="profile__module-content-logo">
                              {e.logo ? <img src={e.logo} /> : null}
                            </div>
                            <div className="profile__module-content-info">
                              <div className="profile__module-content-title">
                                {e.institute}
                              </div>
                              <div className="profile__module-content-subtitle">
                                {e.totalYear} years
                              </div>
                            </div>
                          </div>
                          {e.degrees.map((deg: any) => (
                            <div className="profile__module-content-position">
                              <div className="profile__module-content-title">
                                <span>
                                  {deg.title}, {deg.department}, {deg.gpa}
                                </span>
                                {editable ? (
                                  <button className="profile__module-content-edit">
                                    <FontAwesomeIcon icon="pen" />
                                  </button>
                                ) : null}
                              </div>

                              <div className="profile__module-content-time">
                                {new Date(deg.start).getFullYear()} -{" "}
                                {deg.finish !== null
                                  ? new Date(deg.finish).getFullYear()
                                  : "Present"}
                              </div>
                              <div className="profile__module-content-description">
                                {deg.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="profile__module-content">
                          <div className="profile__module-content-logo">
                            {e.logo ? <img src={e.logo} /> : null}
                          </div>
                          <div className="profile__module-content-info">
                            <div className="profile__module-content-title">
                              <span>
                                {e.degree[0].title}, {e.degree[0].department},{" "}
                                {e.degree[0].gpa}
                              </span>
                              {editable ? (
                                <button className="profile__module-content-edit">
                                  <FontAwesomeIcon icon="pen" />
                                </button>
                              ) : null}
                            </div>
                            <div className="profile__module-content-subtitle">
                              {e.university}
                            </div>
                            <div className="profile__module-content-time">
                              {new Date(e.degrees[0].start).getFullYear()} -{" "}
                              {e.degrees[0].finish !== null
                                ? new Date(e.degrees[0].finish).getFullYear()
                                : "Present"}
                            </div>
                            <div className="profile__module-content-description">
                              {e.degrees[0].description}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </React.Fragment>
                );
              case "skill":
                return (
                  <React.Fragment>
                    <ProfileModuleHeader
                      type={type}
                      title="Skills & Endorsements"
                      addMore={true}
                    />
                    {groupedSkills.length
                      ? groupedSkills.slice(0, 2).map((groupedSkill: any) => (
                          <div
                            key={groupedSkill.title}
                            className="profile__module-skill"
                          >
                            <div className="profile__module-skill-title">
                              {groupedSkill.title}
                              <span>{groupedSkill.endorsedBy.length}</span>
                            </div>
                            <div className="profile__module-skill-endorsement">
                              <div className="profile__module-skill-endorsement-by">
                                <div className="profile__module-skill-endorsement-by-logo">
                                  <img
                                    src={groupedSkill.endorsedBy[0].picture}
                                  />
                                </div>
                                <div className="profile__module-skill-endorsement-by-text">
                                  Endorsed by{" "}
                                  <span>
                                    {groupedSkill.endorsedBy[0].name} and{" "}
                                    {groupedSkill.endorsedBy.length - 1} others
                                    who are highly skilled at this
                                  </span>
                                </div>
                              </div>
                              <div className="profile__module-skill-endorsement-by">
                                {groupedSkill.endorsedBy.filter(
                                  (e: any) => e.isColleague === true
                                ).length ? (
                                  <React.Fragment>
                                    <div className="profile__module-skill-endorsement-by-logo">
                                      <img
                                        src={groupedSkill.endorsedBy[0].picture}
                                      />
                                    </div>
                                    <div className="profile__module-skill-endorsement-by-text">
                                      Endorsed by{" "}
                                      <span>
                                        {
                                          groupedSkill.endorsedBy.filter(
                                            (e: any) => e.isColleague === true
                                          ).length
                                        }{" "}
                                        of {groupedSkill.endorsedBy[0].name}
                                        's colleagues at Bilkent University
                                      </span>
                                    </div>
                                  </React.Fragment>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                    {showMore ? (
                      <div className="profile__module-showmore">
                        <hr />
                        <button>
                          Show more <FontAwesomeIcon icon="chevron-down" />
                        </button>
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              case "accomplishement":
                return (
                  <React.Fragment>
                    <ProfileModuleHeader
                      type={type}
                      title="Accomplishements"
                      addMore={true}
                    />
                    {accomplishements.length
                      ? accomplishements.map(accomplishement => (
                          <div className="profile__module-accomplishement">
                            <div className="profile__module-accomplishement-count">
                              <span>{accomplishement.contents.length}</span>
                            </div>
                            <div className="profile__module-accomplishement-text">
                              <div className="profile__module-accomplishement-title">
                                <span>{accomplishement.title}</span>
                                <button>
                                  <FontAwesomeIcon icon="chevron-down" />
                                </button>
                              </div>
                              <div className="profile__module-accomplishement-content">
                                {accomplishement.contents.map(
                                  (content: any, i: number) => (
                                    <React.Fragment>
                                      {content.title}
                                      {accomplishement.contents.length !==
                                      i + 1 ? (
                                        <span />
                                      ) : null}
                                    </React.Fragment>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </React.Fragment>
                );
              case "interest":
                return (
                  <React.Fragment>
                    <ProfileModuleHeader
                      type={type}
                      title="Interests"
                      addMore={false}
                    />
                    {interests.length ? (
                      <div className="profile__module-interest">
                        {interests.map((interest: any) => (
                          <div className="profile__module-interest-item">
                            <div className="profile__module-interest-item-logo">
                              <img src={interest.logo} />
                            </div>
                            <div className="profile__module-interest-item-text">
                              <div className="profile__module-interest-item-title">
                                {interest.title}
                              </div>
                              <div className="profile__module-interest-item-member">
                                {interest.memberCount} members
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {seeAll ? (
                      <div className="profile__module-showmore">
                        <hr />
                        <button>See all</button>
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              default:
                return null;
            }
          })()}
        </div>
      );
    }
  )
);

export default ProfileModule;
