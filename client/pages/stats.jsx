import React from 'react';
import TripSelect from '../components/trip-select';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      tripId: null,
      expenses: []
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
    fetch(`/api/expenses/${event.target.value}`)
      .then(res => res.json())
      .then(expenses => {
        this.setState({ expenses });
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
      </div>
    );
  }
}
