import React from 'react';
import AppContext from '../lib/app-context';

const expenseCategories = {
  foodAndDrink: ['Breakfast', 'Lunch', 'Dinner', 'Coffee', 'Drinks', 'Other'],
  localTransportation: ['Car Rental', 'Fuel', 'Taxi', 'Train', 'Public', 'Other'],
  shopping: ['Souvenirs', 'Gifts', 'Supplies', 'Other'],
  entertainment: ['Attractions', 'Tours', 'Excursions', 'Events', 'Other'],
  lodging: ['Vacation Rental', 'Hotel', 'Hostel', 'Campsite', 'Other'],
  internationalTransportation: ['Round Trip Airfare', 'One Way Airfare', 'Train', 'Bus', 'Other'],
  administrative: ['Travel Insurance', 'Passports', 'Visas', 'Pet Boarding', 'Other'],
  medical: ['Immunizations', 'Prescriptions', 'Medical Insurance', 'Pharmacy', 'Medical Care', 'Other'],
  miscellaneous: null
};

export default class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      currency: 'EUR',
      exchange: 0
    };
    this.convertCurrency = this.convertCurrency.bind(this);
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
    return (
      <div className='container'>
        <form>
          <select className='country-select'>
            <option>Country</option>
          </select>
        </form>
        <div className='icon-container'>
          <button className='fas fa-utensils icon food' />
          <button className='fas fa-bus icon local-transportation' />
          <button className='fas fa-gift icon shopping' />
          <button className='fas fa-theater-masks icon entertainment' />
          <button className='fas fa-bed icon lodging' />
          <button className='fas fa-plane-departure icon international-transportation' />
          <button className='fas fa-globe icon administrative' />
          <button className='fas fa-heartbeat icon medical' />
          <button className='fas fa-asterisk icon misc' />
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
