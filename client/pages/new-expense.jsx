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
      <>
      </>
    );
  }
}

NewExpense.contextType = AppContext;
