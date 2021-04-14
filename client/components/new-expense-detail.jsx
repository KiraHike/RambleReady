import React from 'react';
import ToggleSwitch from './toggle-switch';

export default class NewExpenseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.makeOptions = this.makeOptions.bind(this);
  }

  makeOptions(array) {
    if (array.length < 1) {
      return <select disabled className='subcategory-select' />;
    } else {
      const optionsList = array.map(option => {
        return (
          <option value={option} key={option}>{option}</option>
        );
      });
      return (
        <select value={this.props.value} name='subcategory' className='subcategory-select'>
          <option>Select</option>
          {optionsList}
        </select>
      );
    }
  }

  render() {
    const subcategoryOptions = this.makeOptions(this.props.subcategoryArray);
    return (
      <form
        onChange={this.props.onChange}
        onSubmit={this.props.onSubmit}
        className='form-new-expense'
      >
        <label htmlFor='amount' />
        <input required
          type='number'
          step='0.01'
          min='0.01'
          name='amount'
          className='subcategory-amount'
          placeholder='Amount'
          value={this.props.value}
        />
        {subcategoryOptions}
        <div className='toggle-container'>
          <p className='toggle-currency'>{this.props.currency}</p>
          <ToggleSwitch
            toggle={this.props.toggle}
            onClick={this.props.onClick}
          />
          <p className='toggle-currency'>USD</p>
        </div>
        <label htmlFor='notes' />
        <input
          type='textarea'
          name='notes'
          className='expense-notes'
          placeholder='Notes (Optional)'
          value={this.props.value}
        />
        <label htmlFor='date' />
        <input required
          type='date'
          name='date'
          className='expense-date'
          value={this.props.value}
        />
        <button type='submit' className='button-add-expense' >SAVE</button>
      </form>
    );
  }
}
