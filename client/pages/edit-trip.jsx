import React from 'react';
import AppContext from '../lib/app-context';
import dateYearMonthDay from '../lib/format-date-ymd';
import dateMonthDayYear from '../lib/format-date-mdy';

export default class EditTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      country: '',
      budget: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  componentDidMount() {
    fetch(`/api/trips/${this.props.tripId}`)
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
    fetch(`/api/trips/${this.props.tripId}`, {
      method: 'PATCH',
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

  handleDelete(event) {
    this.setState({ isDeleting: true });
  }

  handleClose(event) {
    this.setState({ isDeleting: false });
  }

  handleConfirmDelete(event) {
    fetch(`api/trips/${this.props.tripId}`, {
      method: 'DELETE',
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
    if (this.state.isDeleting) {
      const startDateMonthDayYear = dateMonthDayYear(this.state.startDate);
      const endDateMonthDayYear = dateMonthDayYear(this.state.endDate);
      return (
        <div className='container confirm-delete'>
          <div className='confirm-delete-box'>
            <button className='button-close right' onClick={this.handleClose}>x</button>
            <h3>Delete Trip?</h3>
            <div className='trip-delete-container'>
              <h4 className='trip-delete-country'>{this.state.country}</h4>
              <p className='trip-delete-date'>{startDateMonthDayYear} - {endDateMonthDayYear}</p>
              <p className='trip-delete-budget'>Budget: ${this.state.budget}</p>
            </div>
            <button className='fas fa-check-square button-confirm' onClick={this.handleConfirmDelete} />
        </div>
      </div >
      );
    } else {
      const startDateYearMonthDay = dateYearMonthDay(this.state.startDate);
      const endDateYearMonthDay = dateYearMonthDay(this.state.endDate);
      return (
        <div className='container new-trip'>
          <div className='form-container'>
            <a className='anchor-right' href='#trips'>
              <button className='button-close'>x</button>
            </a>
            <h3>Edit Trip</h3>
            <form className='form-new-trip' onSubmit={this.handleSubmit}>
              <label htmlFor='startDate' className='text-dark-blue'>Start Date</label>
              <input required type='date' name='startDate' className='border-dark-blue' value={startDateYearMonthDay} onChange={this.handleChange} />
              <label htmlFor='endDate' className='text-dark-blue'>End Date</label>
              <input required type='date' name='endDate' className='border-dark-blue' value={endDateYearMonthDay} onChange={this.handleChange} />
              <label htmlFor='country' className='text-blue'>Country</label>
              <input required type='text' name='country' className='border-blue' value={this.state.country} onChange={this.handleChange} />
              <label htmlFor='budget' className='text-light-blue'>Budget</label>
              <input required type='number' name='budget' min='1' className='border-light-blue' value={this.state.budget} onChange={this.handleChange} />
                <button type='submit' className='button-save right'>SAVE</button>
            </form>
            <button className='button-delete' onClick={this.handleDelete}>DELETE</button>
          </div>
        </div >
      );
    }
  }
}

EditTrip.contextType = AppContext;
