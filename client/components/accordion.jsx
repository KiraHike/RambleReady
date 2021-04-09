import React from 'react';
import dateMonthDayYear from '../lib/format-date-mdy';

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  makeList(array) {
    const trips = array.map(trip => {
      if (trip.tripId === Number(this.state.view)) {
        const startDateMonthDayYear = dateMonthDayYear(trip.startDate);
        const endDateMonthDayYear = dateMonthDayYear(trip.endDate);
        return (
          <li key={trip.tripId}>
            <div className='trip-list-header-container'>
              <h3 id={trip.tripId} className='trip-list-header'>{trip.country}</h3>
            </div>
            <div className='trip-list-details'>
              <div className='trip-list-date-range'>{startDateMonthDayYear} - {endDateMonthDayYear}</div>
              <div className='trip-list-budget'>Budget: ${trip.budget}</div>
              <a href={`#edittrip?tripId=${trip.tripId}`} className='button-edit-trip'>
                <p className='trip-list-edit-text'>EDIT</p>
              </a>
            </div>
          </li>
        );
      } else {
        return (
          <li key={trip.tripId}>
            <div className='trip-list-header-container'>
              <h3 id={trip.tripId} className='trip-list-header'>{trip.country}</h3>
            </div>
          </li>
        );
      }
    });

    return <ul onClick={this.handleClick}>{trips}</ul>;
  }

  handleClick(event) {
    if (event.target.matches('h3')) {
      event.target.id === this.state.view
        ? this.setState({ view: 0 })
        : this.setState({ view: event.target.id });
    }
  }

  render() {
    const list = this.makeList(this.props.array);
    return (
      <>
        {list}
      </>
    );
  }

}
