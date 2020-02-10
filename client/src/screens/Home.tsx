import React from "react";

import ProfileHeader from "./../components/ProfileHeader";
import ProfileModule from "./../components/ProfileModule";

const Home: React.SFC<{}> = () => (
  <React.Fragment>
    <ProfileHeader />
    <ProfileModule
      type="experience"
      addMore={true}
      editable={true}
      showMore={false}
      seeAll={false}
    />
    <ProfileModule
      type="education"
      addMore={true}
      editable={true}
      showMore={false}
      seeAll={false}
    />
    <ProfileModule
      type="skill"
      addMore={true}
      editable={true}
      showMore={false}
      seeAll={false}
    />
    <ProfileModule
      type="accomplishement"
      addMore={true}
      editable={true}
      showMore={false}
      seeAll={false}
    />
    <ProfileModule
      type="interest"
      addMore={true}
      editable={true}
      showMore={false}
      seeAll={false}
    />
  </React.Fragment>
);

export default Home;
