import React from "react";

import { inject, observer } from "mobx-react";
import { UserStore } from "../store/userStore";

import ProfileHeaderImage from "./ProfileHeaderImage";
import ProfileHeaderTitle from "./ProfileHeaderTitle";

import styled from "styled-components";
import theme from "styled-theming";

export interface ProfileHeaderProps {
  userStore?: UserStore;
}

const ProfileHeader = inject("userStore")(
  observer(({ userStore }: ProfileHeaderProps) => {
    const backgroundColor = theme("mode", {
      light: "var(--white)",
      dark: "var(--shadow)"
    });

    const Wrapper = styled.div`
      background-color: ${backgroundColor};
    `;

    if (!userStore) {
      return null;
    }

    const { displayName, photo, experiences, educations } = userStore.self!;

    const currentPosition: any = experiences.filter(
      (experience: any) => experience.finish === null
    )[0];
    const sortedEducation: any = educations.sort(
      (a: any, b: any) => a.start - b.start
    );

    return (
      <Wrapper className="profile__header">
        <ProfileHeaderImage
          coverSrc={photo.originalUrl}
          profileSrc={photo.thumbnailUrl}
        />
        <ProfileHeaderTitle
          name={displayName}
          position={currentPosition.position}
          company={currentPosition.company.title}
          companyIcon={currentPosition.company.logo}
          address={currentPosition.location}
          connectionCount={412}
          education={sortedEducation[0].institute}
          educationIcon={sortedEducation[0].logo}
        />
      </Wrapper>
    );
  })
);

export default ProfileHeader;
