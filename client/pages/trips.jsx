import React from 'react';
import TripCard from '../components/tripcard';

export default class Trips extends React.Component {

  render() {
    return (
      <>
      <h2>My Trips</h2>
      <button>Add New Trip</button>
      <TripCard />
      </>
    );
  }
}
