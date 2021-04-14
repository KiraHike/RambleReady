import React from 'react';
import AppContext from '../lib/app-context';
import TripSelect from '../components/trip-select';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      trip: null,
      tripSum: null,
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
            if (expenses.length < 1) {
              this.setState({ trip, tripSum: null, tripBalance: 0 });
            } else {
              const tripSum = expenses.reduce((accumulator, currentValue) => {
                return accumulator + Number(currentValue.amount);
              }, Number(expenses[0].amount)).toFixed(2);
              const tripBalance = (Number(trip.budget) - tripSum).toFixed(2);
              this.setState({ trip, tripSum, tripBalance });
            }
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (!this.state.trip) {
      return (
        <div className='container'>
          <form>
            <TripSelect
              tripArray={this.state.trips}
              onChange={this.handleSelect}
              value={this.value}
            />
          </form>
        </div>
      );
    }
    return (
      <div className='container'>
        <form>
          <TripSelect
            tripArray={this.state.trips}
            onChange={this.handleSelect}
            value={this.value}
          />
        </form>
        <div className='trip-balance'>
          {`Balance:  $${this.state.tripBalance}`}
          <progress className='progress-bar' max={Number(this.state.trip.budget)} value={this.state.tripSum} />
        </div>
      </div>
    );
  }
}

Home.contextType = AppContext;
