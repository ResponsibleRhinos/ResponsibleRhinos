import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (<div>
      <h1>TODO: Place App Here</h1>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));