import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    window.location.hash = event.target.id;
  }

  makeNavBar() {
    const navArray = [
      {
        active: 'navIcon dark-blue fas fa-home',
        inactive: 'navIcon fas fa-home',
        route: 'home'
      },
      {
        active: 'navIcon green fas fa-dollar-sign',
        inactive: 'navIcon fas fa-dollar-sign',
        route: 'newexpense'
      },
      {
        active: 'navIcon purple fas fa-chart-pie',
        inactive: 'navIcon fas fa-chart-pie',
        route: 'stats'
      },
      {
        active: 'navIcon light-blue fas fa-suitcase',
        inactive: 'navIcon fas fa-suitcase',
        route: 'trips',
        alt1: 'newtrip',
        alt2: 'edittrip'
      }
    ];

    const navBar = navArray.map(icon => {
      if (this.props.route.path === icon.route ||
        this.props.route.path === icon.alt1 ||
        this.props.route.path === icon.alt2) {
        return <li key={icon.route} id={icon.route} className={icon.active} />;
      } else {
        return <li key={icon.route} id={icon.route} className={icon.inactive} />;
      }
    });

    return <ul onClick={this.handleClick} className='nav-bar'>{navBar}</ul>;
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
