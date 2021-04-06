import React from 'react';
import NavBar from './components/navbar';
import Trips from './pages/trips';

export default class App extends React.Component {

  render() {
    return (
      <>
      <header><h1>Ramble Ready</h1></header>
      <div className='container'>
      <Trips />
      </div>
      <footer><NavBar /></footer>
      </>
    );
  }
}
