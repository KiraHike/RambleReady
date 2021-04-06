import React from 'react';

export default class NewTrip extends React.Component {
  render() {
    return (
      <div className='form-container'>
        <button className='button-close'>X</button>
        <h3>New Trip</h3>
        <form className='form-new-trip'>
          <input required type='date' name='date-start' />
          <input required type='date' name='date-end' />
          <input required type='text' name='country' />
          <input required type='number' name='budget' min='1' />
          <button type='submit' className='button-save'>SAVE</button>
        </form>
      </div>
    );
  }
}
