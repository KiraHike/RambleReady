import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default class PieChart extends React.Component {
  render() {
    return (
        <Doughnut
          width={300}
          height={210}
          data={this.props.data}
          options={{
            legend: {
              position: 'left',
              labels: {
                boxWidth: 10,
                boxHeigth: 10
              }
            }
          }} />
    );
  }
}
