import React from 'react';

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
        return (
          <li key={trip.tripId}>
            <h3 id={trip.tripId}>{trip.country}</h3>
            <div>
              <div className='card-date-range'>{trip.startDate} - {trip.endDate}</div>
              <div className='card-budget'>Budget: ${trip.budget}</div>
            </div>
          </li>
        );
      } else {
        return (
          <li key={trip.tripId}>
            <h3 id={trip.tripId}>{trip.country}</h3>
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
