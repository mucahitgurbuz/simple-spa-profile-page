import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPen } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPen);

export interface ProfileModuleHeaderAddProps {
  type: string;
}

const ProfileModuleHeaderAdd: React.SFC<ProfileModuleHeaderAddProps> = ({
  type
}) => {
  return type === "skill" ? (
    <div>
      <button className="profile__module-header-add-text">
        Add a new skill
      </button>
      <button className="profile__module-header-add-text">
        <FontAwesomeIcon icon="pen" />
      </button>
    </div>
  ) : (
    <button className="profile__module-header-add">+</button>
  );
};

export default ProfileModuleHeaderAdd;
