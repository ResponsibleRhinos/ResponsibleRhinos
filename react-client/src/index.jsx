import React from 'react';
import ReactDOM from 'react-dom';
import MainMap from './components/map.jsx'
import PinCreator from './components/pincreator.jsx'
import PinInfo from './components/pininfo.jsx'

import NavBar from './components/navbar.jsx';
// import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
    <div>
      <NavBar/>
      <PinCreator/>
      <MainMap/>
      <PinInfo/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));