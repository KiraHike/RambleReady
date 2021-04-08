import React from 'react';
import AppContext from '../lib/app-context';
import formatDateEdit from '../lib/format-date-edit';

export default class EditTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripId: '',
      startDate: '',
      endDate: '',
      country: '',
      budget: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/trips/1')
      .then(res => res.json())
      .then(trip => {
        this.setState(trip);
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/trips/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json());

    this.setState({
      tripId: '',
      startDate: '',
      endDate: '',
      country: '',
      budget: ''
    });

    window.location.hash = '#trips';
  }

  render() {
    const formattedStartDate = formatDateEdit(this.state.startDate);
    const formattedEndDate = formatDateEdit(this.state.endDate);
    return (
      <div className='container new-trip'>
        <div className='form-container'>
          <a className='anchor-right' href='#trips'>
            <button className='button-close'>x</button>
          </a>
          <h3>Edit Trip</h3>
          <form className='form-new-trip' onSubmit={this.handleSubmit}>
            <label htmlFor='startDate' className='text-dark-blue'>Start Date</label>
            <input required type='date' name='startDate' className='border-dark-blue' value={formattedStartDate} onChange={this.handleChange} />
            <label htmlFor='endDate' className='text-dark-blue'>End Date</label>
            <input required type='date' name='endDate' className='border-dark-blue' value={formattedEndDate} onChange={this.handleChange} />
            <label htmlFor='country' className='text-blue'>Country</label>
            <input required type='text' name='country' className='border-blue' value={this.state.country} onChange={this.handleChange} />
            <label htmlFor='budget' className='text-light-blue'>Budget</label>
            <input required type='number' name='budget' min='1' className='border-light-blue' value={this.state.budget} onChange={this.handleChange} />
            <div className='button-container'>
              <button className='button-delete'>DELETE</button>
              <button type='submit' className='button-save'>SAVE</button>
            </div>
          </form>
        </div>
      </div >
    );
  }
}

EditTrip.contextType = AppContext;
