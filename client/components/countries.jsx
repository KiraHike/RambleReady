import React from 'react';

export default class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.makeOptions = this.makeOptions.bind(this);
  }

  makeOptions(array) {
    const optionsList = array.map(option => {
      return (
        <option key={option.country}>{option.country}</option>
      );
    });
    return (
      <select className='border-blue new-trip-input'>
        {optionsList}
      </select>
    );
  }

  render() {
    const countryOptions = this.makeOptions(this.props.countriesArray);
    return countryOptions;
  }
}
