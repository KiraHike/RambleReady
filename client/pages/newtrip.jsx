import React from 'react';
import AppContext from '../lib/app-context';

export default class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      country: '',
      budget: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      .then(res => res.json())
      .then(result => {
        window.location.hash = '#trips';
      });

    this.setState({
      startDate: '',
      endDate: '',
      country: '',
      budget: ''
    });

    window.location.hash = 'trips';
  }

  render() {

    return (
      <div className='container new-trip'>
        <div className='form-container'>
          <a href='#trips'>
            <button className='button-close'>x</button>
          </a>
          <h3>New Trip</h3>
          <form className='form-new-trip' onSubmit={this.handleSubmit}>
            <label htmlFor='startDate' className='text-dark-blue'>Start Date</label>
            <input required type='date' name='startDate' className='border-dark-blue' onChange={this.handleChange} />
            <label htmlFor='endDate' className='text-dark-blue'>End Date</label>
            <input required type='date' name='endDate' className='border-dark-blue' onChange={this.handleChange} />
            <label htmlFor='country' className='text-blue'>Country</label>
            <input required type='text' name='country' className='border-blue' onChange={this.handleChange} />
            <label htmlFor='budget' className='text-light-blue'>Budget</label>
            <input required type='number' name='budget' min='1' className='border-light-blue' onChange={this.handleChange} />
            <button type='submit' className='button-save'>SAVE</button>
          </form>
        </div>
      </div >
    );
  }
}

NewTrip.contextType = AppContext;
