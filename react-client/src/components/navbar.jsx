import React from 'react';

class Navbar extends React.Component{

  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div className="NavBar">
      <button className="Newmap">NewMap</button>
      <button className="Login">Login</button>
    </div>)
  }
}


export default Navbar;