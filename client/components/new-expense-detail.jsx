import React from 'react';

export default class NewExpenseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.makeSubcategories = this.makeSubcategories.bind(this);
  }

  makeSubcategories(array) {
    const expenseSubcategories = array.map(subcategory => {
      return (
        <li key={this.props.subcategory}>
          <input type='radio' name='subcategory' />
          <label htmlFor='subcategory'>{this.props.subcategory}</label>
        </li>
      );
    });

    return <ul className='subcategory-list'>{expenseSubcategories}</ul>;
  }

  render() {
    const subcategories = this.makeSubcategories(this.props.array);
    return (
      <>
      <div className='container'>
        <div className='form-container'>
          <a className='anchor-right' href='#newexpense'>
            <button className='button-close'>x</button>
          </a>
          <h3>{this.props.category}</h3>
          <form className='form-new-expense'>
            <label htmlFor='amount' />
            <input required type='number' name='amount' className='border-light-blue' placeholder={this.props.currency} />
            {subcategories}
            <label htmlFor='notes' />
            <input type='textarea' name='notes' className='border-dark-blue' placeholder='Notes (Optional)' />
            <label htmlFor='expenseDate' />
            <input required type='date' name='expenseDate' className='border-light-blue' />
            <button type='submit' className='fas fa-plus' />
          </form>
        </div>
      </div>
      </>
    );
  }
}
