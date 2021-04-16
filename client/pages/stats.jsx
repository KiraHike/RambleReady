import React from 'react';
import TripSelect from '../components/trip-select';
import formatMonthDayYear from '../lib/format-date-mdy';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      tripId: null,
      expenses: [],
      isExpanded: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/trips')
      .then(res => res.json())
      .then(trips => {
        this.setState({ trips });
      });
  }

  handleSelect(event) {
    fetch(`/api/expenses/${event.target.value}`)
      .then(res => res.json())
      .then(expenses => {
        this.setState({ expenses, tripId: event.target.value });
      });
  }

  handleClick(event) {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  makeLineItems(array) {
    const categoryHeaders = [
      {
        category: 'foodAndDrink',
        header: 'Food & Drink'
      },
      {
        category: 'localTransportation',
        header: 'Local Transport'
      },
      {
        category: 'shopping',
        header: 'Shopping'
      },
      {
        category: 'entertainment',
        header: 'Entertainment'
      },
      {
        category: 'lodging',
        header: 'Lodging'
      },
      {
        category: 'internationalTransportation',
        header: 'International Transport'
      },
      {
        category: 'administrative',
        header: 'Administrative'
      },
      {
        category: 'medical',
        header: 'Medical'
      },
      {
        category: 'miscellaneous',
        header: 'Miscellaneous'
      }
    ];

    const dates = array.map(date => {
      const formattedDate = formatMonthDayYear(date.date);
      const categories = date.expenses.map(category => {
        let header;
        let items;
        for (let i = 0; i < categoryHeaders.length; i++) {
          if (category.category === categoryHeaders[i].category) {
            header = categoryHeaders[i].header;
            items = category.expenses.map(item => {
              return (
                  <li key={item.expenseId}>
                    <div>
                      {item.subcategory}
                      {'$' + (item.amount).toFixed(2)}
                    </div>
                    <div>
                      {item.notes}
                    </div>
                  </li>
              );
            });
          }
        }
        return (
            <ul key={date.date + category.category}>
              <h4>{header}</h4>
              {items}
            </ul>
        );
      });
      return (
      <ol key={date.date}>
        {formattedDate}
        {categories}
        </ol>
      );
    });
    return (
      <>
      {dates}
      </>
    );
  }

  render() {

    if (!this.state.tripId) {
      return (
        <div className='container'>
          <form>
            <TripSelect
              tripArray={this.state.trips}
              onChange={this.handleSelect}
              value={this.value}
            />
          </form>
        </div>
      );
    }

    if (!this.state.isExpanded) {
      return (
        <div className='container'>
          <form>
            <TripSelect
              tripArray={this.state.trips}
              onChange={this.handleSelect}
              value={this.value}
            />
          </form>
            <button className='daily-expenses-button' onClick={this.handleClick}>Daily Expenses</button>
        </div>
      );
    }
    const lineItems = this.makeLineItems(this.state.expenses);
    return (
      <div className='container'>
        <form>
          <TripSelect
            tripArray={this.state.trips}
            onChange={this.handleSelect}
            value={this.value}
          />
        </form>
          <button className='daily-expenses-button' onClick={this.handleClick}>Daily Expenses</button>
        <div>
        {lineItems}
        </div>
      </div>
    );
  }
}
