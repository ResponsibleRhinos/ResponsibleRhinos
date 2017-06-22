import React from 'react';

class Navbar extends React.Component{

  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div className="navbar navbar-default">
      <button className="Newmap">NewMap</button>
      <button className="Login pull-right">Login</button>
    </div>)
  }
}


export default Navbar;