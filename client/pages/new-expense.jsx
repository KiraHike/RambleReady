import React from 'react';
import AppContext from '../lib/app-context';

export default class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      currency: '',
      exchange: ''
    };

  }

  render() {
    return (
      <div className='container'>
      <form>
        <label htmlFor='currency' />
        <input required type='number' name='currency' placeholder={this.state.currency} />
        <button type='submit' className='fas fa-calculator' />
      </form>
      </div>
    );
  }
}

NewExpense.contextType = AppContext;
