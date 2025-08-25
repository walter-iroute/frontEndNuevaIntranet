import React from 'react';
import {  NavigationEntity, NavigationViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
import { NavigationItem } from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import './menu-header.css'

export function CustomNavigationView(props: NavigationViewProps<NavigationEntity>) {
   // attributes are needed for the widget to be visible in edit mode
  let attributes = props.attributes;
  let navigationAttributes = props.navCustomAttributes;
  let items = props.items;

  (items);

  return (
    <div {...attributes} className='menu-header'>
      <nav {...navigationAttributes} className="navbar navbar-expand-lg navbar-light">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className='navbar-nav'>
            {items.map((node, idx) => renderRootLevelNode(node, idx))}   
          </ul>
        </div>
      </nav>
    </div>
  );
}

function renderRootLevelNode(node: NavigationItem, idx: number) {
  const dropdownId = `dropdown-${node.Key}`;

  if (node.ChildNodes?.length > 0) {
    return (
      <li key={idx} className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" id={dropdownId} role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {node.Title}
        </a>
        <ul className="dropdown-menu" aria-labelledby={dropdownId}>
          { node.ChildNodes.map(child => renderSubLevelsRecursive(child)) }
        </ul>
      </li>
    )
  }

  return (
    <li key={idx} className="nav-item">
      <a className="nav-link" href={node.Url} target={node.LinkTarget}>
        {node.Title}
      </a>
    </li>
  );
}

function renderSubLevelsRecursive(node: NavigationItem) {
  const dropdownId = `dropdown-${node.Key}`;

  if(node.ChildNodes?.length > 0) {
    return (
      <li key={node.Key} className="dropdown-submenu">
        <a className="dropdown-item dropdown-toggle" id={dropdownId} role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {node.Title}
        </a>
        <ul className="dropdown-menu" aria-labelledby={dropdownId}>
          { node.ChildNodes.map(child => renderSubLevelsRecursive(child)) }
        </ul>
      </li>
    );
  }

  return (
    <li key={node.Key}>
      <a className="dropdown-item" href={node.Url} target={node.LinkTarget}>
        {node.Title}
      </a>
    </li>
  );
};