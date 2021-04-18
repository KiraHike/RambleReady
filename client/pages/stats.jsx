import React from 'react';
import TripSelect from '../components/trip-select';
import formatMonthDayYear from '../lib/format-date-mdy';
import PieChart from '../components/pie-chart';

const categoryHeaders = [
  {
    category: 'administrative',
    header: 'Administrative',
    total: 0
  },
  {
    category: 'medical',
    header: 'Medical',
    total: 0
  },
  {
    category: 'foodAndDrink',
    header: 'Food & Drink',
    total: 0
  },
  {
    category: 'localTransportation',
    header: 'Local Transport',
    total: 0
  },
  {
    category: 'shopping',
    header: 'Shopping',
    total: 0
  },
  {
    category: 'entertainment',
    header: 'Entertainment',
    total: 0
  },
  {
    category: 'lodging',
    header: 'Lodging',
    total: 0
  },
  {
    category: 'internationalTransportation',
    header: 'International Transport',
    total: 0
  },
  {
    category: 'miscellaneous',
    header: 'Miscellaneous',
    total: 0
  }
];

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      tripId: null,
      expenses: [],
      isExpanded: false,
      pieChartData: [],
      lineItems: null
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

  makeLineItems(array) {
    const dates = array.map(date => {
      const formattedDate = formatMonthDayYear(date.date);
      const categories = date.expenses.map(category => {
        let header;
        let items;
        for (let i = 0; i < categoryHeaders.length; i++) {
          if (category.category === categoryHeaders[i].category) {
            header = categoryHeaders[i].header;
            items = category.expenses.map(item => {
              categoryHeaders[i].total += item.amount;
              if (item.notes) {
                return (
                  <li className='line-item-list-item-li' key={item.expenseId}>
                    <div>
                      <div className='line-item-list-item'>
                        <span className='line-item-list-item-subcategory'>{item.subcategory}</span>
                        <span className='line-item-list-item-amount'>{'$' + (item.amount).toFixed(2)}</span>
                      </div>
                      <div className='line-item-list-notes'>
                        {item.notes}
                      </div>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li className='line-item-list-item-li' key={item.expenseId}>
                    <div className='line-item-list-item'>
                      <span className='line-item-list-item-subcategory'>{item.subcategory}</span>
                      <span className='line-item-list-item-amount'>{'$' + (item.amount).toFixed(2)}</span>
                    </div>
                  </li>
                );
              }
            });
          }
        }
        return (
          <ul className='line-item-list-category' key={date.date + category.category}>
            <h4 className='line-item-list-category-header'>{header}</h4>
            {items}
          </ul>
        );
      });
      return (
        <ol className='line-item-list' key={date.date}>
          <h3 className='line-item-list-date'>{formattedDate}</h3>
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

  makePieChartData(pieChartDataArray) {
    const data = [];
    for (let i = 0; i < pieChartDataArray.length; i++) {
      data.push(pieChartDataArray[i].total.toFixed(2));
    }
    return data;
  }

  handleSelect(event) {
    fetch(`/api/expenses/${event.target.value}`)
      .then(res => res.json())
      .then(expenses => {
        const lineItems = this.makeLineItems(expenses);
        const pieChartData = this.makePieChartData(categoryHeaders);
        this.setState({ expenses, tripId: event.target.value, lineItems, pieChartData });
      });
  }

  handleClick(event) {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    for (let i = 0; i < categoryHeaders.length; i++) {
      categoryHeaders[i].total = 0;
    }

    if (!this.state.tripId) {
      return (
        <div className='container'>
          <form>
            <TripSelect
              tripArray={this.state.trips}
              onChange={this.handleSelect}
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
            />
          </form>
          <button className='daily-expenses-button' onClick={this.handleClick}>Daily Expenses</button>
          <div>
            <h3 className='trip-expenses-header'>Trip Expenses:</h3>
            <PieChart data={{
              labels: [
                `Admin. $${this.state.pieChartData[0]}`,
                `Food $${this.state.pieChartData[1]}`,
                `Med. $${this.state.pieChartData[2]}`,
                `Trans. $${this.state.pieChartData[3]}`,
                `Shop. $${this.state.pieChartData[4]}`,
                `Ent. $${this.state.pieChartData[5]}`,
                `Lodging $${this.state.pieChartData[6]}`,
                `Int. Trans. $${this.state.pieChartData[7]}`,
                `Misc. $${this.state.pieChartData[8]}`
              ],
              datasets: [{
                label: 'Trip Expenses',
                data: this.state.pieChartData,
                backgroundColor: [
                  'rgb(10, 103, 241)',
                  'rgb(65, 195, 44)',
                  'rgb(209, 40, 142)',
                  'rgb(18, 61, 146)',
                  'rgb(242, 34, 34)',
                  'rgb(138, 12, 198)',
                  'rgb(248, 126, 14)',
                  'rgb(10, 172, 241)',
                  'rgb(244, 221, 11)'
                ]
              }]
            }} />
          </div>
        </div>
      );
    }

    return (
      <div className='container'>
        <form>
          <TripSelect
            tripArray={this.state.trips}
            onChange={this.handleSelect}
          />
        </form>
        <button className='daily-expenses-button' onClick={this.handleClick}>Daily Expenses</button>
        <div className='line-item-list-container'>
          {this.state.lineItems}
        </div>
      </div>
    );
  }
}
