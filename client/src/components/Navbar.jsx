import React, { useState } from 'react';
import { IconButton, Nav } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

const navLinks = [
  { name: 'Home', url: '/index.html', key: 'home' },
  { name: 'Dashboard', url: '#', key: 'dashboard' }, // Point to a non-existent URL to render dashboard sub-tabs
  { name: 'Blog', url: '/blog.html', key: 'blog' },
  { name: 'Contact', url: '/contact.html', key: 'contact' }
];

const Navbar = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <header className="site-navbar py-4" role="banner">
      <div className="container">
        {/* Menu Toggle Icon */}
        <IconButton
          iconProps={{
            iconName: isMenuVisible ? 'Cancel' : 'GlobalNavButton',
          }}
          title={isMenuVisible ? 'Close Menu' : 'Open Menu'}
          onClick={toggleMenu}
          ariaLabel={isMenuVisible ? 'Close navigation menu' : 'Open navigation menu'}
        />

        {/* Mobile Menu */}
        {isMenuVisible && (
          <div
            className="site-mobile-menu"
            style={{
              width: '30%', // Adjust the width to 30% when the menu is visible
              height: '100%',
              transition: 'width 0.3s ease',
            }}
          >
            <Nav groups={[{ links: navLinks }]} onLinkClick={toggleMenu} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;








