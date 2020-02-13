import React from "react";

import ProfileHeader from "./../components/ProfileHeader";
import ProfileModule from "./../components/ProfileModule";

const Home: React.SFC<{}> = () => {
  return (
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
        showMore={true}
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
        addMore={false}
        editable={true}
        showMore={false}
        seeAll={true}
      />
    </React.Fragment>
  );
};

export default Home;
