import React from 'react';
import ToggleSwitch from './toggle-switch';

export default class NewExpenseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.makeOptions = this.makeOptions.bind(this);
  }

  makeOptions(array) {
    if (!array) {
      return <select disabled className='subcategory-select' />;
    } else {
      const optionsList = array.map(option => {
        return (
          <option key={option}>{option}</option>
        );
      });
      return (
        <select className='subcategory-select'>
          {optionsList}
        </select>
      );
    }
  }

  render() {
    const subcategoryOptions = this.makeOptions(this.props.subcategoryArray);
    return (
      <>
      <div className='container'>
        <div className='expense-form-container'>
          <a className='anchor-right' href='#newexpense'>
            <button className='button-close'>x</button>
          </a>
          <h3>{this.props.category}</h3>
          <form className='form-new-expense'>
            <label htmlFor='amount' />
            <input required type='number' name='amount' className='subcategory-amount' placeholder='Amount' />
            {subcategoryOptions}
            <div className='toggle-container'>
              <p className='toggle-currency'>EUR</p>
              <ToggleSwitch />
              <p className='toggle-currency'>USD</p>
            </div>
            <label htmlFor='notes' />
            <input type='textarea' name='notes' className='expense-notes' placeholder='Notes (Optional)' />
            <label htmlFor='expenseDate' />
            <input required type='date' name='expenseDate' className='expense-date' />
            <button type='submit' className='button-add-expense'>SAVE</button>
          </form>
        </div>
      </div>
      </>
    );
  }
}
