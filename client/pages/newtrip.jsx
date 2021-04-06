import React from 'react';
import AppContext from '../lib/app-context';

export default class NewTrip extends React.Component {
  render() {
    return (
      <div className='container new-trip'>
        <div className='form-container'>
          <a href='#trips'>
            <button className='button-close'>x</button>
          </a>
          <h3>New Trip</h3>
          <form className='form-new-trip'>
            <label htmlFor='date-start' className='text-dark-blue'>Start Date</label>
            <input required type='date' name='date-start' className='border-dark-blue' placeholder='Start Date' />
            <label htmlFor='date-end' className='text-dark-blue'>End Date</label>
            <input required type='date' name='date-end' className='border-dark-blue' />
            <label htmlFor='country' className='text-blue'>Country</label>
            <input required type='text' name='country' className='border-blue' />
            <label htmlFor='budget' className='text-light-blue'>Budget</label>
            <input required type='number' name='budget' min='1' className='border-light-blue' />
            <button type='submit' className='button-save'>SAVE</button>
          </form>
        </div>
      </div >
    );
  }
}

NewTrip.contextType = AppContext;
