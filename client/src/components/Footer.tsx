import React from 'react';

export interface FooterProps {
  children?: React.ReactNode[]
}

const Footer: React.SFC<FooterProps> = ({ children }) => (
  <div id="footer" className="flex-row flex--centered" >
    <span>
      Made with <span style={{ color: 'crimson' }}>&#9829; </span> by <a href="http:/ / i4.com.tr / ">i4</a>
    </span>
    {children}
  </div>
);

export default Footer;
