import React from 'react';
import AppContext from '../lib/app-context';
import NewExpenseDetail from '../components/new-expense-detail';
import calculate from '../lib/calculateUSD';
import TripSelect from '../components/trip-select';

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
      trips: [],
      tripId: null,
      currency: null,
      exchangeRate: null,
      amountForeign: null,
      amountUSD: null,
      view: null,
      date: null,
      category: null,
      subcategory: null,
      notes: null,
      amount: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.convertCurrency = this.convertCurrency.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/trips')
      .then(res => res.json())
      .then(trips => {
        this.setState({ trips });
      });
  }

  handleSelect(event) {
    const id = event.target.value;
    fetch(`/api/trips/${id}`)
      .then(res => res.json())
      .then(trip => {
        this.setState({ tripId: trip.tripId, currency: trip.currency });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    if (event.target.matches('button')) {
      window.location.hash = `#newexpense?tripId=${this.state.tripId}?currency=${this.state.currency}`;
      this.setState({ view: event.target.id, category: event.target.id });
    }
  }

  handleClose(event) {
    window.location.hash = '#newexpense';
    this.setState({ view: null });
  }

  convertCurrency(event) {
    event.preventDefault();
    const { currency, tripId, exchangeRate } = this.state;
    if (this.state.exchangeRate) {
      const amountUSD = calculate(this.state.amountForeign, exchangeRate);
      this.setState({ amountUSD, currency, tripId, exchangeRate });
    }

    fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${this.state.currency}/USD`)
      .then(result => {
        return result.json();
      })
      .then(data => {
        const exchangeRate = data.conversion_rate;
        const amountUSD = calculate(this.state.amountForeign, exchangeRate);
        this.setState({ exchangeRate, amountUSD, currency, tripId });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        res.json();
        this.setState({ view: null });
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
            <NewExpenseDetail
              currency={this.state.currency}
              category={expenseCategories[type].category}
              subcategoryArray={expenseCategories[type].subcategories}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              amount={this.state.amount}
              subcategory={this.state.subcategory}
              notes={this.state.notes}
              date={this.state.date}
            />
          </div>
        </div>
      );
    }

    if (!this.state.tripId) {
      return (
        <div className='container'>
          <form>
            <TripSelect
              tripArray={this.state.trips}
              onChange={this.handleSelect}
              value={this.value} />
          </form>
          <div className='icon-container'>
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
              <input disabled type='number' name='convert' className='converter-input' />
              <button disabled type='submit' className='fas fa-calculator icon calculator' />
            </form>
          </div>
        </div>
      );
    }

    let converterResult;
    (this.state.amountUSD)
      ? converterResult = `$${this.state.amountUSD}`
      : converterResult = '';

    return (
      <div className='container'>
        <form>
          <TripSelect
            tripArray={this.state.trips}
            onChange={this.handleSelect}
            value={this.value}
          />
        </form>
        <div
          className='icon-container'
          onClick={this.handleClick}
        >
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
            <input required
              type='number'
              name='amountForeign'
              className='converter-input'
              placeholder={this.state.currency}
              onChange={this.handleChange}
            />
            <button
              type='submit'
              className='fas fa-calculator icon calculator'
              onClick={this.convertCurrency}
            />
          </form>
        </div>
        <div className='converter-result'>{converterResult}</div>
      </div>
    );
  }
}

NewExpense.contextType = AppContext;
