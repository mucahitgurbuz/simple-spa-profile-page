import React from 'react';

import ProfileHeader from './../components/ProfileHeader';
import ProfileModule from './../components/ProfileModule';

const Home: React.SFC<{}> = () => (
  <React.Fragment>
    <ProfileHeader />
    <ProfileModule type="experience"/>
    <ProfileModule type="education"/>
    <ProfileModule type="skill" />
    <ProfileModule type="accomplishement" />
    <ProfileModule type="interest" />
  </React.Fragment>
);

export default Home;
