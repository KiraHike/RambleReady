import React from 'react';
import AppContext from '../lib/app-context';
import NewExpenseDetail from '../components/new-expense-detail';

const expenseCategories = {
  foodAndDrink: ['Breakfast', 'Lunch', 'Dinner', 'Coffee', 'Drinks', 'Other'],
  localTransportation: ['Car Rental', 'Fuel', 'Taxi', 'Train', 'Public', 'Other'],
  shopping: ['Souvenirs', 'Gifts', 'Supplies', 'Other'],
  entertainment: ['Attractions', 'Tours', 'Excursions', 'Events', 'Other'],
  lodging: ['Hotel', 'Vacation Rental', 'Hostel', 'Campsite', 'Other'],
  internationalTransportation: ['Airfare', 'Train', 'Bus', 'Other'],
  administrative: ['Passports', 'Visas', 'Travel Insurance', 'Pet Boarding', 'Other'],
  medical: ['Pharmacy', 'Immunizations', 'Medical Insurance', 'Medical Care', 'Other'],
  miscellaneous: null
};

export default class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      currency: 'EUR',
      exchange: 0,
      view: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.convertCurrency = this.convertCurrency.bind(this);
  }

  handleClick(event) {
    if (event.target.matches('button')) {
      this.setState({ view: event.target.id });
    }
  }

  convertCurrency(event) {
    fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${this.state.currency}/USD`)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ exchange: data.conversion_rate });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.view) {
      return (
        <NewExpenseDetail category={this.state.view} subcategoryArray={expenseCategories[this.state.view]} />
      );
    }
    return (
      <div className='container'>
        <form>
          <select className='country-select'>
            <option>Country</option>
          </select>
        </form>
        <div className='icon-container' onClick={this.handleClick}>
          <button id='foodAndDrink' className='fas fa-utensils icon food' />
          <button id='localTransportation' className='fas fa-bus icon local-transportation' />
          <button id='shopping' className='fas fa-gift icon shopping' />
          <button id='entertainment' className='fas fa-theater-masks icon entertainment' />
          <button id='lodging' className='fas fa-bed icon lodging' />
          <button id='internationalTransportation' className='fas fa-plane-departure icon international-transportation' />
          <button id='administrative' className='fas fa-globe icon administrative' />
          <button id='medical' className='fas fa-heartbeat icon medical' />
          <button id='miscellaneous' className='fas fa-asterisk icon misc' />
        </div>
        <div className='converter-container'>
          <form className='converter-form'>
            <input required type='number' name='currency' className='converter-input' placeholder={this.state.currency} />
            <button type='submit' className='fas fa-calculator icon calculator' onClick={this.convertCurrency} />
          </form>
        </div>
        <div className='converter-result'></div>
      </div>
    );
  }
}

NewExpense.contextType = AppContext;
