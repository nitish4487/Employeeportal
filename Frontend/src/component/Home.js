import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <>
        <Navbar />

        <div className="home-container">
          <div className="imgc"></div>
          <div className="id3">
            <div className="id2">
              <span className="id1"> Welcome To Avanseus!!!</span>
              <div className="id4">
                <Link to='/Esign' className='id5 btn'>Employee</Link>
                <Link to='/Msign' className='id5 btn'>Manager</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
