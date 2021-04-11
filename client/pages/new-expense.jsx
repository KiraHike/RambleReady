import React from 'react';
import AppContext from '../lib/app-context';
import NewExpenseDetail from '../components/new-expense-detail';
import calculate from '../lib/calculateUSD';

const expenseCategories = {
  foodAndDrink: {
    category: 'Food & Drink',
    subcategories: ['Breakfast', 'Lunch', 'Dinner', 'Coffee', 'Drinks', 'Other']
  },
  localTransportation: {
    category: 'Local Transport',
    subcategories: ['Car Rental', 'Fuel', 'Taxi', 'Train', 'Public', 'Other']
  },
  shopping: {
    category: 'Shopping',
    subcategories: ['Souvenirs', 'Gifts', 'Supplies', 'Other']
  },
  entertainment: {
    category: 'Entertainment',
    subcategories: ['Attractions', 'Tours', 'Excursions', 'Events', 'Other']
  },
  lodging: {
    category: 'Lodging',
    subcategories: ['Hotel', 'Vacation Rental', 'Hostel', 'Campsite', 'Other']
  },
  internationalTransportation: {
    category: 'International Transport',
    subcategories: ['Airfare', 'Train', 'Bus', 'Other']
  },
  administrative: {
    category: 'Administrative',
    subcategories: ['Passports', 'Visas', 'Travel Insurance', 'Pet Boarding', 'Other']
  },
  medical: {
    category: 'Medical',
    subcategories: ['Pharmacy', 'Immunizations', 'Medical Insurance', 'Medical Care', 'Other']
  },
  miscellaneous: {
    category: 'Miscellaneous',
    subcategories: null
  }
};

export default class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'EUR',
      convert: null,
      usd: null,
      amount: null,
      subcategory: null,
      notes: null,
      date: null,
      view: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.convertCurrency = this.convertCurrency.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    if (event.target.matches('button')) {
      window.location.hash = `#newexpense?currency=${this.state.currency}`;
      this.setState({ view: event.target.id });
    }
  }

  handleClose(event) {
    window.location.hash = '#newexpense';
    this.setState({ view: null });
  }

  convertCurrency(event) {
    fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${this.state.currency}/USD`)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ usd: calculate(this.state.convert, data.conversion_rate) });
      })
      .catch(err => {
        console.error(err);
      });

  }

  render() {
    if (this.state.view) {
      const type = this.state.view;
      return (
        <div className='container new-expense'>
          <div className='expense-form-container'>
            <button className='button-close right' onClick={this.handleClose}>x</button>
            <h3>{expenseCategories[type].category}</h3>
            <NewExpenseDetail category={expenseCategories[type].category} subcategoryArray={expenseCategories[type].subcategories} />
          </div>
        </div>
      );
    }
    let converterResult;
    (this.state.usd)
      ? converterResult = `$${this.state.usd}`
      : converterResult = '';

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
            <input required type='number' name='convert' className='converter-input' placeholder={this.state.currency} onChange={this.handleChange} />
            <button type='submit' className='fas fa-calculator icon calculator' onClick={this.convertCurrency} />
          </form>
        </div>
        <div className='converter-result'>{converterResult}</div>
      </div>
    );
  }
}

NewExpense.contextType = AppContext;
