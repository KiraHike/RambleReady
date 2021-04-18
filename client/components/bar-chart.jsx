import React from 'react';
import { Bar } from 'react-chartjs-2';

export default class PieChart extends React.Component {
  render() {
    return (
      <Bar
        width={300}
        height={150}
        data={this.props.data}
        options={{
          legend: {
            display: false
          }
        }} />
    );
  }
}
