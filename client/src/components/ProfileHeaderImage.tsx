import React from "react";

export interface ProfileHeaderImageProps {
  coverSrc: string;
  profileSrc: string;
}

const ProfileHeaderImage: React.SFC<ProfileHeaderImageProps> = ({
  coverSrc,
  profileSrc
}) => {
  return (
    <div>
      <img className="profile__header-cover" src={coverSrc} />
      <img className="profile__header-pic" src={profileSrc} />
    </div>
  );
};

export default ProfileHeaderImage;
