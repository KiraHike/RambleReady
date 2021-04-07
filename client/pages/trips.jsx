import React from 'react';
import AppContext from '../lib/app-context';
import Accordion from '../components/accordion';

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
        <Accordion array={this.state.trips} />
      </div>
    );
  }
}

Trips.contextType = AppContext;
