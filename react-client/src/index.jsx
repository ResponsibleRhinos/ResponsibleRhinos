import React, { Component } from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainMap from './components/map.jsx';
import PinCreator from './components/pincreator.jsx';
import PinInfo from './components/pininfo.jsx';
import Header from './components/header.jsx'; 
import MapContainer from './components/mapContainer.jsx';
import Paper from 'material-ui/Paper';
import UserPage from './components/userpage.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import axios from 'axios';

injectTapEventPlugin();

class mapView extends React.Component{
  constructor({match}) {
    super({match});
    this.state = {
      currentCenter: {
        lat: 44,
        lng: -122
      },
      zoom: 15,
      currentUser: null
    };
    this.updateCenter = this.updateCenter.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
  }

  updateCenter(center) {
    this.setState({
      currentCenter: center
    });
  }

  updateZoom(zoom) {
    this.setState( {
      zoom: zoom
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header currentUser={this.state.currentUser}/>
          <div style={{height: '0.5em'}}>
          </div>
          <MapContainer currentCenter={this.state.currentCenter}
                        updateCenter={this.updateCenter}
                        updateZoom={this.updateZoom}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

const userView = ({match}) => (
  <MuiThemeProvider>
    <UserPage />
  </MuiThemeProvider>
);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={mapView} />
          <Route path='/user' component={userView} />
        </div>
      </Router>
    );
  }
}


render(<App />, document.getElementById('app'));