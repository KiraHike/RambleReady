import React from 'react';
import AppContext from '../lib/app-context';
import Countries from '../components/countries';

export default class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      currency: '',
      startDate: '',
      endDate: '',
      country: '',
      budget: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(event) {
    fetch('/api/countries')
      .then(res => res.json())
      .then(countries => {
        this.setState({ countries });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        res.json();
        window.location.hash = '#trips';
      });
  }

  render() {
    return (
      <div className='container new-trip'>
        <div className='form-container'>
          <a className='anchor-right' href='#trips'>
            <button className='button-close'>x</button>
          </a>
          <h3>New Trip</h3>
          <form className='form-new-trip' onSubmit={this.handleSubmit}>
            <label htmlFor='startDate' className='text-dark-blue new-trip-label'>Start Date</label>
            <input required type='date' name='startDate' className='border-dark-blue new-trip-input' onChange={this.handleChange} />
            <label htmlFor='endDate' className='text-dark-blue new-trip-label'>End Date</label>
            <input required type='date' name='endDate' className='border-dark-blue new-trip-input' onChange={this.handleChange} />
            <label htmlFor='country' className='text-blue new-trip-label'>Country</label>
            <Countries value={this.value} onChange={this.handleChange} countriesArray = {this.state.countries} />
            <label htmlFor='budget' className='text-light-blue new-trip-label'>Budget</label>
            <input required type='number' name='budget' min='1' className='border-light-blue new-trip-input' onChange={this.handleChange} />
            <button type='submit' className='button-save'>SAVE</button>
          </form>
        </div>
      </div >
    );
  }
}

NewTrip.contextType = AppContext;
