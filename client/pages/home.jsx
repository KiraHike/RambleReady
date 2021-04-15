import React from 'react';
import TripSelect from '../components/trip-select';
import formatYearMonthDay from '../lib/format-date-ymd';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      trip: null,
      tripSum: 0,
      tripBalance: 0,
      dailySum: 0,
      today: new Date().toISOString()
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
      .then(trip => {
        const tripSum = Number(trip.tripSum);
        const tripBalance = (Number(trip.budget) - tripSum).toFixed(2);
        const today = formatYearMonthDay(this.state.today);
        let dailySum = 0;
        for (let i = 0; i < trip.expenses.length; i++) {
          if (trip.expenses[i].date === today) {
            dailySum = (trip.expenses[i].dailySum).toFixed(2);
          }
        }
        this.setState({ trip, tripSum, tripBalance, today, dailySum });
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
          <progress className='progress-bar' max={Number(this.state.trip.budget)} value={this.state.trip.tripSum} />
        </div>
        <div className='daily-balance'>
          {`Spent Today:
          $${this.state.dailySum}`}
        </div>
      </div>
    );
  }
}
