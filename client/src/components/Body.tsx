import React from 'react';

export interface BodyProps {
  children: React.ReactNode[]
}
const Body: React.SFC<BodyProps> = ({ children }) => <div id="body">{children}</div>;

export default Body;
