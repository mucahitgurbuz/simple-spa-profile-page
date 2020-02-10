import React from "react";

import ProfileModuleHeader from "./ProfileModuleHeader";

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
                {experiences.map(e => (
                  <div className="profile__module-content">
                    <div className="profile__module-content-logo">
                      {e.companyLogo ? <img src={e.companyLogo} /> : null}
                    </div>
                    <div className="profile__module-content-info">
                      {e.position ? (
                        <div className="profile__module-content-title">
                          {e.position}
                        </div>
                      ) : null}
                      {e.company ? (
                        <div className="profile__module-content-subtitle">
                          {e.company}
                        </div>
                      ) : null}
                      {e.startDate ? (
                        <div className="profile__module-content-time">
                          {e.startDate} -{" "}
                          {e.finishDate !== null ? e.finishDate : "Present"}
                        </div>
                      ) : null}
                      {e.location ? (
                        <div className="profile__module-content-location">
                          {e.location}
                        </div>
                      ) : null}
                      {e.description ? (
                        <div className="profile__module-content-description">
                          {e.description}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            );
          case "education":
            return (
              <ProfileModuleHeader
                type={type}
                title="Education"
                addMore={true}
              />
            );
          case "skill":
            return (
              <ProfileModuleHeader
                type={type}
                title="Skills & Endorsements"
                addMore={true}
              />
            );
          case "accomplishement":
            return (
              <ProfileModuleHeader
                type={type}
                title="Accomplishements"
                addMore={true}
              />
            );
          case "interest":
            return (
              <ProfileModuleHeader
                type={type}
                title="Interests"
                addMore={false}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default ProfileModule;
