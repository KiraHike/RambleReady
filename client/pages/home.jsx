import React from 'react';
import AppContext from '../lib/app-context';
import TripSelect from '../components/trip-select';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      trip: null,
      tripBalance: null
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    fetch('/api/trips')
      .then(res => res.json())
      .then(trips => {
        this.setState({ trips });
      });
  }

  handleSelect(event) {
    fetch(`/api/trips/${event.target.value}`)
      .then(res => res.json())
      .then(data => {
        const trip = data;
        return fetch(`/api/expenses/${trip.tripId}`)
          .then(res => res.json())
          .then(expenses => {
            const tripSum = expenses.reduce((accumulator, currentValue) => {
              return accumulator + Number(currentValue.amount);
            }, Number(expenses[0].amount)).toFixed(2);
            const tripBalance = (Number(trip.budget) - tripSum).toFixed(2);
            this.setState({ trip, tripBalance });
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className='container'>
        <form>
          <TripSelect
            tripArray={this.state.trips}
            onChange={this.handleSelect}
            value={this.value}
          />
        </form>
        <div className='tripBalance'>
          {`Balance: $${this.state.tripBalance}`}
        </div>
      </div>
    );
  }
}

Home.contextType = AppContext;
