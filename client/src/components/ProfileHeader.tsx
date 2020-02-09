import React from "react";

import { inject, observer } from "mobx-react";
import { UserStore } from "../store/userStore";

import ProfileHeaderImage from "./ProfileHeaderImage";

export interface ProfileHeaderProps {
  userStore?: UserStore;
}

const ProfileHeader = inject("userStore")(
  observer(({ userStore }: ProfileHeaderProps) => {
    if (!userStore) {
      return null;
    }
    console.log(userStore.self!.photo);
    return (
      <div className="profile__header">
        <ProfileHeaderImage
          coverSrc={userStore.self!.photo.originalUrl}
          profileSrc="sds"
        />
      </div>
    );
  })
);

export default ProfileHeader;
