import React from 'react';
import NavBar from './components/navbar';
import Trips from './pages/trips';

export default class App extends React.Component {

  render() {
    return (
      <>
      <h1>Ramble Ready</h1>
      <Trips />
      <NavBar />
      </>
    );
  }
}
