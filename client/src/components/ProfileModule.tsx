import React from 'react';

export interface ProfileModuleProps {
    type: string,
    
  }

const ProfileModule: React.SFC<ProfileModuleProps> = ({ type }) => (
    <span>
      Made with <span style={{ color: 'crimson' }}>&#9829; </span> by <a href="https://mucahit.me">{type}</a>
    </span>
);

export default ProfileModule;
