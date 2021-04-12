import React from 'react';

export default class TripSelect extends React.Component {
  constructor(props) {
    super(props);
    this.makeOptions = this.makeOptions.bind(this);
  }

  makeOptions(array) {
    if (array.length < 1) {
      return (
      <select disabled className='trip-select disabled'>
          <option>Add a Trip</option>
      </select>
      );
    }

    const optionsList = array.map(option => {
      return (
        <option key={option.tripId}>{option.country}</option>
      );
    });
    return (
      <select value={this.props.value} onChange={this.props.onChange} name='country' className='trip-select'>
        {optionsList}
      </select>
    );
  }

  render() {
    const countryOptions = this.makeOptions(this.props.tripArray);
    return countryOptions;
  }
}
