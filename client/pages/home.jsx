import React from 'react';
import AppContext from '../lib/app-context';
import TripSelect from '../components/trip-select';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
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
    const id = event.target.value;
    fetch(`/api/expenses/${id}`)
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

Home.contextType = AppContext;
