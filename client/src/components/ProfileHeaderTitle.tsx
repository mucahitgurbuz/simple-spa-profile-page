import React from "react";

interface ProfileHeaderTitleProps {
  name: string;
  position: string;
  company: string;
  companyIcon: string;
  address: string;
  connectionCount: number;
  education: string;
  educationIcon: string;
}

const ProfileHeaderTitle: React.SFC<ProfileHeaderTitleProps> = ({
  name,
  position,
  company,
  companyIcon,
  address,
  connectionCount,
  education,
  educationIcon
}) => {
  return (
    <div className="profile__header-title">
      <div className="profile__header-title-info">
        <div className="profile__header-title-info-name">{name}</div>
        <div className="profile__header-title-info-position">
          {position} at {company}
        </div>
        <div className="profile__header-title-info-address">
          {address}
          <a href="#">{connectionCount} connections</a>
          <a href="#">Contact info</a>
        </div>
      </div>
      <div className="profile__header-title-logo">
        <div>
          <img src={companyIcon} />
          {company}
        </div>
        <div>
          <img src={educationIcon} />
          {education}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderTitle;
