import React from "react";

export interface ProfileHeaderImageProps {
  coverSrc: string;
  profileSrc: string;
}

const ProfileHeaderImage: React.SFC<ProfileHeaderImageProps> = ({
  coverSrc,
  profileSrc
}) => {
  return <img src={coverSrc} />;
};

export default ProfileHeaderImage;
