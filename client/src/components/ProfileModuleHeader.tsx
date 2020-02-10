import React from "react";

import ProfileModuleHeaderAdd from "./ProfileModuleHeaderAdd";

export interface ProfileModuleHeaderProps {
  title: string;
  type: string;
  addMore: boolean;
}

const ProfileModuleHeader: React.SFC<ProfileModuleHeaderProps> = ({
  title,
  type,
  addMore
}) => {
  return (
    <div className="profile__module-header">
      <div className="profile__module-header-title">{title}</div>
      {addMore ? <ProfileModuleHeaderAdd type={type} /> : null}
    </div>
  );
};

export default ProfileModuleHeader;
