import React from "react";

export interface ProfileModuleHeaderAddProps {
  type: string;
}

const ProfileModuleHeaderAdd: React.SFC<ProfileModuleHeaderAddProps> = ({
  type
}) => {
  return <button className="profile__module-header-add">+</button>;
};

export default ProfileModuleHeaderAdd;
