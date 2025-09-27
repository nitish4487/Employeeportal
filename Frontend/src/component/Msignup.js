import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import EmployeeService from '../services/EmployeeService';
import image from "../images/103.svg";   

export default function Msignup() {
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');

  const userRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = { adminName, password };

    if (adminName === '' || password === '') {
      alert('Enter Valid Data');
    } else {
      EmployeeService.createAdmin(employee).then(() => {
        alert("Admin Registered Successfully");
        navigate("/Msign");
      }).catch(() => {
        alert("Error registering admin. Try again.");
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: "950px", width: "100%" }}>
          <div className="row g-0">
            {/* Left side image */}
            <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
              <img
                src={image}
                alt="signup"
                style={{ width: "80%", maxWidth: "400px" }}
              />
            </div>

            {/* Right side form */}
            <div className="col-md-6 d-flex align-items-center">
              <div className="p-5 w-100">
                <h2 className="text-center text-info fw-bold mb-4">Register As Admin</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Set Admin Username</label>
                    <input
                      className="form-control rounded"
                      type="text"
                      autoComplete="off"
                      name="adminName"
                      ref={userRef}
                      onChange={(e) => setAdminName(e.target.value)}
                      value={adminName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Enter New Password</label>
                    <input
                      className="form-control rounded"
                      type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </div>
                  <div className="d-grid mb-3">
                    <button className="btn btn-primary rounded-pill" type="submit">
                      Register
                    </button>
                  </div>
                  <hr />
                  <p className="text-center">
                    <Link to="/Msign" className="btn btn-outline-primary rounded-pill">
                      Go To Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
