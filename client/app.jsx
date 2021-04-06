import React from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import NavBar from './components/navbar';
import Trips from './pages/trips';
import NewTrip from './pages/newtrip';

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
    const { path } = this.state.route;
    if (path === 'trips') {
      return <Trips />;
    } else if (path === 'newtrip') {
      return <NewTrip />;
    }
  }

  render() {
    const { route } = this.state;
    const contextValue = { route };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <header><h1>Ramble Ready</h1></header>
          {this.renderPage()};
          <footer><NavBar /></footer>
        </>
      </AppContext.Provider>
    );
  }
}
