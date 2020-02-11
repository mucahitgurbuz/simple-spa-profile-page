import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronDown, faPen } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

import ProfileModuleHeader from "./ProfileModuleHeader";

library.add(faPen, faChevronDown);

export interface ProfileModuleProps {
  type: string;
  addMore: boolean;
  editable: boolean;
  showMore: boolean;
  seeAll: boolean;
}

const experiences = [
  {
    company: "OPLOG Operational Logistics",
    companyLogo: "https://picsum.photos/100/100/?image=667",
    position: "Software Development Team Lead",
    startDate: "Dec 2018",
    finishDate: null,
    still: true,
    location: "Ankara, Turkey"
  },
  {
    company: "OPLOG Operational Logistics",
    companyLogo: "https://picsum.photos/100/100/?image=667",
    position: "Software Developer",
    startDate: "Nov 2017",
    finishDate: "Dec 2018",
    still: false,
    location: "Ankara, Turkey"
  },
  {
    company: "Anvato",
    companyLogo: "https://picsum.photos/100/100/?image=667",
    position: "R&D Engineer",
    startDate: "Apr 2012",
    finishDate: "Jan 2013",
    still: false,
    location: "Ankara, Turkey",
    description:
      "TRECVID - Media Event Detection Task (MED). Content-based analysis and retrieval from digital video"
  }
];

const groupedExperiences = experiences.reduce(
  (a, c) => {
    if (a.some((el: any) => el.company === c.company)) {
      a.forEach((e: any) => {
        if (e.company === c.company) {
          e.positions.push({
            title: c.position,
            startDate: c.startDate,
            finishDate: c.finishDate,
            still: c.still,
            location: c.location,
            description: c.description
          });
        }
      });
      return a;
    } else {
      a.push({
        company: c.company,
        companyLogo: c.companyLogo,
        positions: [
          {
            title: c.position,
            startDate: c.startDate,
            finishDate: c.finishDate,
            still: c.still,
            description: c.description,
            location: c.location
          }
        ]
      });
      return a;
    }
  },
  [] as any
);

const educations = [
  {
    university: "Bilkent University",
    universityLogo: "https://picsum.photos/100/100/?image=667",
    degree: "Master's Degree",
    department: "Computer Science",
    gpa: "3.58/4.00",
    startYear: 2010,
    finishYear: 2013,
    still: false,
    description: "MSc Thesis: Lorem Ipsum"
  },
  {
    university: "Bilkent University",
    universityLogo: "https://picsum.photos/100/100/?image=667",
    degree: "Bachelor's Degree",
    department: "Computer Science",
    gpa: "3.09/4.00",
    startYear: 2006,
    finishYear: 2010,
    still: false
  }
];

const groupedEducations = educations.reduce(
  (a, c) => {
    if (a.some((el: any) => el.university === c.university)) {
      a.forEach((e: any) => {
        if (e.university === c.university) {
          e.degrees.push({
            title: c.degree,
            startYear: c.startYear,
            finishYear: c.finishYear,
            still: c.still,
            description: c.description ? c.description : null
          });
        }
      });
      return a;
    } else {
      a.push({
        university: c.university,
        universityLogo: c.universityLogo,
        degrees: [
          {
            title: c.degree,
            startYear: c.startYear,
            finishYear: c.finishYear,
            still: c.still,
            description: c.description ? c.description : null
          }
        ]
      });
      return a;
    }
  },
  [] as any
);

const skills = [
  {
    title: "Java",
    endorsedBy: [
      {
        name: "Berk Gökden",
        picture: "https://picsum.photos/100/100/?image=667",
        isColleague: true
      },
      {
        name: "Mücahit Gürbüz",
        picture: "https://picsum.photos/100/100/?image=667",
        isColleague: true
      },
      {
        name: "Ahmet Hamdi",
        picture: "https://picsum.photos/100/100/?image=667",
        isColleague: true
      },
      {
        name: "Berkan Gök",
        picture: "https://picsum.photos/100/100/?image=667",
        isColleague: false
      }
    ]
  },
  {
    title: "C++",
    endorsedBy: [
      {
        name: "H.Altay Güvenir",
        picture: "https://picsum.photos/100/100/?image=667",
        isColleague: false
      },
      {
        name: "Mücahit Gürbüz",
        picture: "https://picsum.photos/100/100/?image=667",
        isColleague: false
      }
    ]
  },
  {
    title: "Javascript",
    endorsedBy: [
      {
        name: "Başak Özyurt",
        picture: "https://picsum.photos/100/100/?image=667",
        isColleague: true
      },
      {
        name: "Mücahit Gürbüz",
        picture: "https://picsum.photos/100/100/?image=667",
        isColleague: true
      },
      {
        name: "Berkan Gök",
        picture: "https://picsum.photos/100/100/?image=667",
        isColleague: false
      }
    ]
  }
];

const accomplishements = [
  {
    title: "Publications",
    contents: [
      { title: "Matching Islamic Patterns in Kufic Images" },
      {
        title:
          "A Hybrid Approach for Line Segmentation in Handwritten Documents"
      }
    ]
  },
  {
    title: "Awards",
    contents: [
      {
        title: "Best Developer in 2019"
      }
    ]
  }
];

const interests = [
  {
    title: "Bilkent CS Network",
    logo: "https://picsum.photos/100/100/?image=667",
    memberCount: 1908
  },
  {
    title: "Tech Woman Club",
    logo: "https://picsum.photos/100/100/?image=667",
    memberCount: 57
  },
  {
    title: "OPLOG Operational Logistic",
    logo: "https://picsum.photos/100/100/?image=667",
    memberCount: 1109
  },
  {
    title: "Bilkent University",
    logo: "https://picsum.photos/100/100/?image=667",
    memberCount: 65595
  },
  {
    title: "Anvato",
    logo: "https://picsum.photos/100/100/?image=667",
    memberCount: 3665
  },
  {
    title: "Microsoft",
    logo: "https://picsum.photos/100/100/?image=667",
    memberCount: 8356785
  },
  {
    title: "Bilkent Cyberpark",
    logo: "https://picsum.photos/100/100/?image=667",
    memberCount: 5600
  },
  {
    title: "Ankara Tech Network",
    logo: "https://picsum.photos/100/100/?image=667",
    memberCount: 387
  }
];

const ProfileModule: React.SFC<ProfileModuleProps> = ({
  type,
  addMore,
  editable,
  showMore,
  seeAll
}) => {
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
                {groupedExperiences.map(
                  (e: any) =>
                    e.positions.length > 1 ? (
                      <div className="profile__module-content">
                        <div className="profile__module-content-group-header">
                          <div className="profile__module-content-logo">
                            {e.companyLogo ? <img src={e.companyLogo} /> : null}
                          </div>
                          <div className="profile__module-content-info">
                            <div className="profile__module-content-title">
                              {e.company}
                            </div>
                            <div className="profile__module-content-subtitle">
                              10 years
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
                              {pos.startDate} -{" "}
                              {pos.finishDate !== null
                                ? pos.finishDate
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
                            {e.positions[0].startDate} -{" "}
                            {e.positions[0].finishDate !== null
                              ? e.positions[0].finishDate
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
                {groupedEducations.map(
                  (e: any) =>
                    e.degrees.length > 1 ? (
                      <div className="profile__module-content">
                        <div className="profile__module-content-group-header">
                          <div className="profile__module-content-logo">
                            {e.universityLogo ? (
                              <img src={e.universityLogo} />
                            ) : null}
                          </div>
                          <div className="profile__module-content-info">
                            <div className="profile__module-content-title">
                              {e.university}
                            </div>
                            <div className="profile__module-content-subtitle">
                              6 years
                            </div>
                          </div>
                        </div>
                        {e.degrees.map((deg: any) => (
                          <div className="profile__module-content-position">
                            <div className="profile__module-content-title">
                              <span>{deg.title}</span>
                              {editable ? (
                                <button className="profile__module-content-edit">
                                  <FontAwesomeIcon icon="pen" />
                                </button>
                              ) : null}
                            </div>

                            <div className="profile__module-content-time">
                              {deg.startYear} -{" "}
                              {deg.finishYear !== null
                                ? deg.finishYear
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
                          {e.universityLogo ? (
                            <img src={e.universityLogo} />
                          ) : null}
                        </div>
                        <div className="profile__module-content-info">
                          <div className="profile__module-content-title">
                            <span>{e.degree[0].title}</span>
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
                            {e.degrees[0].startYear} -{" "}
                            {e.degrees[0].finishYear !== null
                              ? e.degrees[0].finishYear
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
                {skills.length
                  ? skills.slice(0, 2).map(skill => (
                      <div key={skill.title} className="profile__module-skill">
                        <div className="profile__module-skill-title">
                          {skill.title}
                          <span>{skill.endorsedBy.length}</span>
                        </div>
                        <div className="profile__module-skill-endorsement">
                          <div className="profile__module-skill-endorsement-by">
                            <div className="profile__module-skill-endorsement-by-logo">
                              <img src={skill.endorsedBy[0].picture} />
                            </div>
                            <div className="profile__module-skill-endorsement-by-text">
                              Endorsed by{" "}
                              <span>
                                {skill.endorsedBy[0].name} and{" "}
                                {skill.endorsedBy.length - 1} others who are
                                highly skilled at this
                              </span>
                            </div>
                          </div>
                          <div className="profile__module-skill-endorsement-by">
                            {skill.endorsedBy.filter(
                              e => e.isColleague === true
                            ).length ? (
                              <React.Fragment>
                                <div className="profile__module-skill-endorsement-by-logo">
                                  <img src={skill.endorsedBy[0].picture} />
                                </div>
                                <div className="profile__module-skill-endorsement-by-text">
                                  Endorsed by{" "}
                                  <span>
                                    {
                                      skill.endorsedBy.filter(
                                        e => e.isColleague === true
                                      ).length
                                    }{" "}
                                    of {skill.endorsedBy[0].name}
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
                            {accomplishement.contents.map((content, i) => (
                              <React.Fragment>
                                {content.title}
                                {accomplishement.contents.length !== i + 1 ? (
                                  <span />
                                ) : null}
                              </React.Fragment>
                            ))}
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
                    {interests.map(interest => (
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
};

export default ProfileModule;
