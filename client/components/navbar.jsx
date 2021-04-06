import React from 'react';

export default class NavBar extends React.Component {

  makeNavBar() {
    const navArray = [
      'fas fa-home',
      'fas fa-dollar-sign',
      'fas fa-chart-pie',
      'fas fa-suitcase'
    ];

    const navBar = navArray.map(icon => {
      return <li key={icon} className={icon} />;
    });

    return <ul>{navBar}</ul>;
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
