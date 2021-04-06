import React from 'react';

export default class NavBar extends React.Component {

  makeNavBar() {
    const navArray = [
      'navIcon fas fa-home',
      'navIcon fas fa-dollar-sign',
      'navIcon fas fa-chart-pie',
      'navIcon fas fa-suitcase'
    ];

    const navBar = navArray.map(icon => {
      return <li key={icon} className={icon} />;
    });

    return <ul className='navBar'>{navBar}</ul>;
  }

  render() {
    const navBarComponent = this.makeNavBar();
    return (
      <>
        {navBarComponent}
      </>
    );
  }
}
