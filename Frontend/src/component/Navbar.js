import React, { Component } from 'react';
import logo from "../images/logo.svg"
import "../style/Navbar.css"
class Navbar extends Component {
  render() {

    return (
      <div >    
        <nav className=" bg-primary  id1 navbar navbar-expand bg-primary  border-bottom border-dark  ">
          <div className="container-fluid">
            <img className=".px-2 " src={logo} height="60" width={60}></img>
            <a className=" navbar-brand fs-1 fw-bold " href="/">Avanseus</a>

            <div className="collapse navbar-collapse" >
              <div className="navbar-nav ">
                <a className="nav-link active fs-2  "  href="/">Home</a>

              </div>
            </div>
          </div>
        </nav>
        </div>  
    );
  }
}

export default Navbar;