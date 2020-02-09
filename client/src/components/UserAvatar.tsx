import { Avatar } from 'antd';
import React from 'react';

import srcFromImgPath from '../utils/srcFromImgPath';

export interface UserAvatarProps {
  fName: string,
  lName: string,
  url: string
}

const UserAvatar: React.SFC<UserAvatarProps> = ({ fName, lName, url }) => (
  <Avatar src={url ? srcFromImgPath(url) : url} style={{ verticalAlign: 'middle', marginRight: 10 }} size="small">
    {url ? '' : `${fName.substr(0, 1).toUpperCase()}${lName.substr(0, 1).toUpperCase()}`}
  </Avatar>
);

export default UserAvatar;
