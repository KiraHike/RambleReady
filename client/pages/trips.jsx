import React from 'react';
import TripCard from '../components/tripcard';

export default class Trips extends React.Component {

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='column-full'>
            <h2>My Trips</h2>
          </div>
        </div>
        <div className='row'>
          <div className='column-full'>
            <button className='button-add-trip'>Add New Trip</button>
          </div>
        </div>
        <div className='row'>
          <div className='column-full'>
            <TripCard />
          </div>
        </div>
      </div>
    );
  }
}
