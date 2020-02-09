import React from 'react';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import SidebarMenu from './SidebarMenu';

export interface LayoutProps {
    children: React.ReactNode[]
}

const Layout: React.SFC<LayoutProps> = ({ children }) => (
    <div id="app">
        <Header />
        <SidebarMenu />
        <Body>{children}</Body>
        <Footer />
    </div>
);


export default Layout;
