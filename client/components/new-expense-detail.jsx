import React from 'react';
import ToggleSwitch from './toggle-switch';

export default class NewExpenseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripId: null,
      date: null,
      category: null,
      subcategory: null,
      notes: null,
      amount: null,
      toggleOn: false
    };
    this.makeOptions = this.makeOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ tripId: this.props.tripId });
  }

  makeOptions(array) {
    if (!array) {
      return <select disabled className='subcategory-select' />;
    } else {
      const optionsList = array.map(option => {
        return (
          <option value={option} key={option}>{option}</option>
        );
      });
      return (
        <select value={this.value} name='subcategory' className='subcategory-select'>
          <option>Select</option>
          {optionsList}
        </select>
      );
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleToggle(event) {
    (this.state.toggleOn)
      ? this.setState({ toggleOn: false })
      : this.setState({ toggleOn: true });
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
    const subcategoryOptions = this.makeOptions(this.props.subcategoryArray);
    return (
      <form onChange={this.handleChange} className='form-new-expense'>
        <label htmlFor='amount' />
        <input required value={this.value} type='number' name='amount' className='subcategory-amount' placeholder='Amount' />
        {subcategoryOptions}
        <div className='toggle-container'>
          <p className='toggle-currency'>{this.props.currency}</p>
          <ToggleSwitch toggle={this.state.toggleOn} onClick={this.handleToggle} />
          <p className='toggle-currency'>USD</p>
        </div>
        <label htmlFor='notes' />
        <input value={this.value} type='textarea' name='notes' className='expense-notes' placeholder='Notes (Optional)' />
        <label htmlFor='date' />
        <input value={this.value} required type='date' name='date' className='expense-date' />
        <button type='submit' className='button-add-expense'>SAVE</button>
      </form>
    );
  }
}
