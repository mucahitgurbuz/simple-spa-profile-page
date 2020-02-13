import React from "react";
import styled from "styled-components";
import theme from "styled-theming";

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
  const color = theme("mode", {
    light: "var(--primary-color)",
    dark: "white"
  });

  const Wrapper = styled.div`
    color: ${color};
  `;
  return type === "skill" ? (
    <Wrapper>
      <button className="profile__module-header-add-text">
        Add a new skill
      </button>
      <button className="profile__module-header-add-text">
        <FontAwesomeIcon icon="pen" />
      </button>
    </Wrapper>
  ) : (
    <Wrapper>
      <button className="profile__module-header-add">+</button>
    </Wrapper>
  );
};

export default ProfileModuleHeaderAdd;
