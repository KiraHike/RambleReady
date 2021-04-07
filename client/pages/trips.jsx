import React from 'react';
import AppContext from '../lib/app-context';
import TripCard from '../components/tripcard';

export default class Trips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }

  componentDidMount() {
    fetch('/api/trips')
      .then(res => res.json())
      .then(trips => {
        this.setState({ trips });
      });
  }

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
