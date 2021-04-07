import React from 'react';
import AppContext from '../lib/app-context';
import TripCard from '../components/tripcard';

export default class Trips extends React.Component {

  render() {
    return (
      <div className='card'>
        <div className='row'>
          <div className='column-full'>
            <h2>My Trips</h2>
          </div>
        </div>
        <div className='row'>
          <div className='column-full'>
            <a href='#newtrip'>
              <button className='button-add-trip'>Add New Trip</button>
            </a>
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

Trips.contextType = AppContext;
