import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Navbar from './Navbar';
import AlertMessage from './Alert';
import image from "../images/1.svg";

export default function Esignup() {
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [address, setAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isValid, setIsValid] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const userRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = { fullName, emailId, address, userName, password };

    if (!fullName.trim() || !emailId.trim() || !address.trim() || !userName.trim() || !password.trim()) {
      setIsValid(false);
      setTimeout(() => setIsValid(true), 3000);
    } else if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      EmployeeService.createEmployee(employee).then(() => {
        setIsSuccess(true);
        setTimeout(() => navigate("/Esign"), 2000);
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-container d-flex justify-content-center align-items-start min-vh-100" style={{ paddingTop: "90px" }}>
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: "1000px", width: "100%", minHeight: "600px" }}>
          <div className="row g-0">
            {/* Left Image */}
            <div className="col-md-5 d-flex justify-content-center align-items-center bg-light">
              <img src={image} alt="signup" style={{ width: "75%", maxWidth: "350px" }} />
            </div>

            {/* Right Form */}
            <div className="col-md-7 d-flex align-items-center">
              <div className="p-5 w-100" style={{ maxHeight: "550px" }}>
                <h2 className="text-center text-info fw-bold mb-4">Register New Employee</h2>

               
                {!isValid && <AlertMessage text="Enter Valid Data" color="red" />}
                {isSuccess && <AlertMessage text="Employee Registered Successfully" color="green" />}
                {!passwordMatch && <AlertMessage text="Passwords don't match!" color="orange" />}

                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        ref={userRef}
                        type="text"
                        className="form-control rounded"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email ID</label>
                      <input
                        type="email"
                        className="form-control rounded"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control rounded"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control rounded"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control rounded"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid mb-3">
                    <button className="btn btn-primary rounded-pill" type="submit">
                      Submit
                    </button>
                  </div>

                  <p className="text-center">
                    <a href="/Esign" className="btn btn-outline-primary rounded-pill">
                      Login
                    </a>
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
