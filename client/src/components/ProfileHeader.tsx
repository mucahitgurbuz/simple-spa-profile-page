import React from "react";

import { inject, observer } from "mobx-react";
import { UserStore } from "../store/userStore";

import ProfileHeaderImage from "./ProfileHeaderImage";
import ProfileHeaderTitle from "./ProfileHeaderTitle";

export interface ProfileHeaderProps {
  userStore?: UserStore;
}

const ProfileHeader = inject("userStore")(
  observer(({ userStore }: ProfileHeaderProps) => {
    if (!userStore) {
      return null;
    }
    const { photo } = userStore.self!;
    return (
      <div className="profile__header">
        <ProfileHeaderImage
          coverSrc={photo.originalUrl}
          profileSrc={photo.thumbnailUrl}
        />
        <ProfileHeaderTitle
          name="Hande Adıgüzel"
          position="Software Development Team Lead"
          company="OPLOG Operational Logistic"
          companyIcon={photo.thumbnailUrl}
          address="Seattle, Washington"
          connectionCount={412}
          education="Bilkent University"
          educationIcon={photo.thumbnailUrl}
        />
      </div>
    );
  })
);

export default ProfileHeader;
