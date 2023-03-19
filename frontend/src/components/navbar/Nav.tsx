import React from 'react';
import './Nav.css';
import * as data from './links.json';
const linksStr = JSON.stringify(data);
const links = JSON.parse(linksStr).links;

type Link = {
  label: string;
  href: string;
};

// instead of hardcoding nav links in the file, we use the links.json he;per file to house them

const Links: React.FC<{links: Link[]}> = ({ links }) => {
  return (
    <div className="links-container">
      {links.map((link: Link) => {
        return (
          <div className="link" key={link.href}>
            <a href="link.href">
              {link.label}
            </a>
          </div>
        )
      })}
    </div>
  )
};

const Nav: React.FC<{}> = () => {
  return (
    <nav className='navbar'>
      <div className="logo-container">
        <span>Farming Assistant</span>
      </div>
      <Links links={links} />
    </nav>
  )
}

export default Nav