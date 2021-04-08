import React from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import NavBar from './components/navbar';
import Trips from './pages/trips';
import NewTrip from './pages/newtrip';
import EditTrip from './pages/edit-trip';
import ConfirmDelete from './pages/confirm-delete';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'trips') {
      return <Trips />;
    } else if (route.path === 'newtrip') {
      return <NewTrip />;
    } else if (route.path === 'edittrip') {
      const tripId = route.params.get('tripId');
      return <EditTrip tripId={tripId} />;
    } else if (route.path === 'confirmdelete') {
      const tripId = route.params.get('tripId');
      return <ConfirmDelete tripId={tripId} />;
    }
  }

  render() {
    const { route } = this.state;
    const contextValue = { route };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <header><h1>Ramble Ready</h1></header>
          {this.renderPage()}
          <footer><NavBar /></footer>
        </>
      </AppContext.Provider>
    );
  }
}
